import { Block } from "../../utils/Block.ts";
import "./message-media.scss";

export type MessageMediaProps = {
  src: string;
  date: string;
};

class MessageMediaCmp extends Block<MessageMediaProps> {
  constructor(props: MessageMediaProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
    <li class="message-media">
      <div class="message-media__content" style="background-image: url({{src}})" ></div>
      <span class="message-media__date">{{date}}</span>
    </li>
    `;
  }
}

export const MessageMedia = (props: MessageMediaProps) => {
  return new MessageMediaCmp(props);
};
