import { expect } from "chai";
import { describe } from "mocha";
import { Block } from "./Block.ts";
import sinon from "sinon";

interface Props {
  text?: string;
  events?: Record<string, () => void>;
}

describe("Bloc", () => {
  let PageClass: typeof Block<Props>;

  before(() => {
    class Page extends Block<Props> {
      constructor(props: Props) {
        super(props);
      }

      protected render() {
        return `
          <div>
            <span id="test-text">{{text}}</span>
            <button>{{text-button}}</button>
          </div>`;
      }
    }

    PageClass = Page;
  });

  it("Должен создать компонент с пропсами из конструктора", () => {
    const text = "HELLO";
    const pageComponent = new PageClass({ text });
    const spanText =
      pageComponent.element.querySelector("#test-text")?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it("У компонента должно быть реактивное поведение", () => {
    const text = "Bye!";
    const pageComponent = new PageClass({ text: "Hello!" });
    pageComponent.setProps({ text });
    const spanText =
      pageComponent.element.querySelector("#test-text")?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it("Компонент должен установить события на элемент", () => {
    const handleStub = sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: handleStub,
      },
    });
    const event = new MouseEvent("click");
    pageComponent.element.dispatchEvent(event);
    expect(handleStub.calledOnce).to.be.true;
  });

  it("Компонент должен вызвать dispatchComponentDidMount вызывается, когда элемент попал в DOM", () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new PageClass();
    // @ts-expect-error Мы можем получить доступ к CDM несмотря на protected
    const spyCSM = sinon.spy(pageComponent, "componentDidMount");
    const element = pageComponent.element;
    document.body.append(element);
    clock.next();

    expect(spyCSM.calledOnce).to.be.true;
  });
});
