import { Block } from "../../utils/Block.ts";
import "./message-text.scss";

export type MessageTextProps = {
  "user-class": string;
  message: string;
  date: string;
};

class MessageTextCmp extends Block<MessageTextProps> {
  constructor(props: MessageTextProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
      <li class="message-text message-text_{{user-class}}">{{message}}
        <span class="message-text__date message-text__date_{{user-class}}">{{date}}</span>
      </li>
    `;
  }
}

export const MessageText = (props: MessageTextProps) => {
  return new MessageTextCmp(props);
};
