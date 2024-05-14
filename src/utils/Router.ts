import { Block } from "./Block.ts";
import { Route } from "./Route.ts";

export class Router {
  private static instance: Router | undefined;

  private routes: Route[] = [];

  protected currentRoute: Route | null = null;

  private history: History = window.history;

  private rootId: string = "root";

  constructor() {
    if (Router.instance) {
      return Router.instance;
    }

    Router.instance = this;
  }

  public use(path: string, block: typeof Block<object>) {
    const route = new Route(path, block, { rootId: this.rootId });
    this.routes.push(route);
    return this;
  }

  public start = (): void => {
    window.onpopstate = (event: PopStateEvent): void => {
      this.onRoute((<Window>event.currentTarget).location.pathname);
    };

    this.history.pushState("", "", window.location.pathname);
    this.onRoute(window.location.pathname);
  };

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    this.currentRoute = route;

    route.render();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public changeRootId(rootId: string) {
    this.rootId = rootId;
    return this;
  }
}
