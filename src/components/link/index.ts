import { Block } from "../../utils/Block.ts";
import { Router } from "../../utils/Router.ts";
import "./link.scss";
export type LinkProps = {
  href: string;
  text?: string;
  className?: string;
  innerHTML?: string;
};

export type LinkBlock = {
  events: { click: (event: Event) => void };
} & LinkProps;

class LinkCmp extends Block<LinkBlock> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const router = new Router();
          router.go(props.href);
        },
      },
    });
  }

  protected render() {
    const { className, text, innerHTML } = this.props;
    return `<a class="link-main ${className || ""}">${text || ""}${innerHTML || ""}</a>`;
  }
}

export const Link = (props: LinkProps) => {
  return new LinkCmp(props);
};
