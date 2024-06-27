import { Block } from "./Block";

export class Route {
  private pathname: string;

  private readonly blockClass: typeof Block<object>;

  private block: Block<object> | null;

  private readonly props: Record<string, unknown>;

  constructor(
    pathname: string,
    view: typeof Block<object>,
    props: Record<string, unknown>
  ) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public match(pathname: string) {
    return pathname === this.pathname;
  }

  private routerRender(rootId: string, block: Block<object>) {
    const root = document.getElementById(rootId);
    if (!root) return;
    root.innerHTML = "";
    root.append(block.element);

    return root;
  }

  public render() {
    if (!this.block) {
      this.block = new this.blockClass();
      if ("rootId" in this.props && typeof this.props.rootId === "string") {
        this.routerRender(this.props.rootId, this.block);
      }

      return;
    }

    if ("rootId" in this.props && typeof this.props.rootId === "string") {
      this.routerRender(this.props.rootId, this.block);
    }
  }
}
