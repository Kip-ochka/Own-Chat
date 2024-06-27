import { Block } from "../../utils/Block.ts";
import "./button.scss";

export type ButtonChatOptionProps = {
  childrenHTML: string;
  events: {
    click: (event: Event) => void;
  };
};
export type ButtonChatOptionBlock = ButtonChatOptionProps;

class ButtonChatOptionCmp extends Block<ButtonChatOptionBlock> {
  constructor(props: ButtonChatOptionProps) {
    super({ ...props });
  }

  protected render() {
    const { childrenHTML } = this.props;
    return `<button class="button-chat-option">${childrenHTML}</button>`;
  }
}

export const ButtonChatOption = (props: ButtonChatOptionProps) => {
  return new ButtonChatOptionCmp(props);
};
