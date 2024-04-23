import { Block } from "../../utils/Block.ts";
import "./button.scss";

export type ButtonProps = {
  text: string;
  className?: string;
  type?: string;
  form?: string;
  events?: {
    click: (event: MouseEvent) => void;
  };
};

export class ButtonCmp extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const { className = "", type = "button" } = this.props;
    // language=hbs
    return `
      <button class="button ${className}" type="${type}" form="{{form}}">
        {{text}}
      </button>
    `;
  }
}

export const Button = (props: ButtonProps) => {
  return new ButtonCmp(props);
};
