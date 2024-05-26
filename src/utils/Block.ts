import { EventBus } from "./EventBus.ts";
import { v4 as makeUUID } from "uuid";
import Handlebars from "handlebars";

export class Block<Props extends object = object> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(_oldProps: Props, _newProps: Props) {
    return true;
  }

  protected componentDidMount() {}

  protected init() {}

  protected render() {}

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  private node: HTMLElement | null = null;

  protected children: { [key: string]: Block<object> };

  protected props: Props;

  private readonly eventBus: EventBus;

  public __id = makeUUID();

  constructor(propsAndChildren: Props = {} as Props) {
    this.eventBus = new EventBus();

    const { children, props } = this.getChildren(propsAndChildren);

    this.children = children;

    this.props = this.makePropsProxy({ ...props, __id: this.__id } as Props);

    this.registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private getChildren(propsAndChildren: Props) {
    const children = {} as { [key: string]: Block<object> };
    const props = {} as Props;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key as keyof Props] = value;
      }
    });

    return { children, props };
  }

  private makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target: Props, prop: string & keyof Props) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (
        target: Props,
        prop: string & keyof Props,
        newProps: Props[string & keyof Props]
      ) => {
        const oldProps = { ...target };

        target[prop] = newProps;

        this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.coreInit.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.coreComponentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.coreComponentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.coreRender.bind(this));
  }

  private coreInit() {
    this.init();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private coreComponentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  private coreComponentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.coreRender();
  }

  public dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private coreRender() {
    const templateString = this.render();
    const template = Handlebars.compile(templateString);
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      propsAndStubs[key] = `<div data-id="${child.__id}"></div>`;
    });

    const fragment = this.createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = template({
      ...propsAndStubs,
      children: this.children,
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.__id}"]`);

      if (!stub) {
        return;
      }
      stub.replaceWith(child.element);
    });

    if (this.node) {
      this.removeEvents();
      this.node.replaceWith(newElement);
    }

    this.node = newElement;
    this.addEvents();
  }

  private createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", this.__id);
    return element;
  }

  private addEvents() {
    if ("events" in this.props) {
      Object.entries(this.props.events as Record<string, () => void>).forEach(
        ([event, listener]) => {
          this.node!.addEventListener(event, listener);
        }
      );
    }
  }

  private removeEvents() {
    if ("events" in this.props) {
      Object.entries(this.props.events as Record<string, () => void>).forEach(
        ([event, listener]) => {
          this.node!.removeEventListener(event, listener);
        }
      );
    }
  }

  public get element() {
    // Хак что бы вызвать CDM только полсле добавления в DOM
    if (this.node?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.node?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }
    return this.node as HTMLElement;
  }

  public show() {
    this.element.style.display = "block";
  }

  public hide() {
    this.element.style.display = "none";
  }

  public setProps = <T>(nextProps: T) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };
}
