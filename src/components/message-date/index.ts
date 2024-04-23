import { Block } from "../../utils/Block.ts";
import "./media-date.scss";

export type MessageDateProps = {
  date: string;
};

class MessageDateCmp extends Block<MessageDateProps> {
  constructor(props: MessageDateProps) {
    super(props);
  }

  protected render(): string {
    //language=hbs
    return `
      <li class="message-date">{{date}}</li>
    `;
  }
}

export const MessageDate = (props: MessageDateProps) => {
  return new MessageDateCmp(props);
};
