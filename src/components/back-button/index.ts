import { Block } from "../../utils/Block.ts";
import "./back-button.scss";
import { Router } from "../../utils/Router.ts";

export type BackButtonProps = {
  href: string;
};

export type BackButtonBlock = {
  events: { click: (event: Event) => void };
} & BackButtonProps;

class BackButtonCmp extends Block<BackButtonBlock> {
  constructor(props: BackButtonProps) {
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

  protected render(): string {
    // language=hbs
    return `
      <a class="back-button">
        <div class="back-button-link">
        </div>
      </a>
    `;
  }
}

export const BackButton = (props: BackButtonProps) => {
  return new BackButtonCmp(props);
};
