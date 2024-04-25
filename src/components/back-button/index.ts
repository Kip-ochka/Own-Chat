import { Block } from "../../utils/Block.ts";
import "./back-button.scss";

export type BackButtonProps = {
  href: string;
};

class BackButtonCmp extends Block<BackButtonProps> {
  constructor(props: BackButtonProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
      <a href="{{href}}" class="back-button">
        <div  class="back-button__link">
        </div>
      </a>
    `;
  }
}

export const BackButton = (props: BackButtonProps) => {
  return new BackButtonCmp(props);
};
