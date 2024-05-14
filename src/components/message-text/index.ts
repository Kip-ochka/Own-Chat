import { Block } from "../../utils/Block.ts";
import "./message-text.scss";
import { store } from "../../store";

export type MessageTextProps = {
  userId: string;
  message: string;
  date: string;
};

class MessageTextCmp extends Block<MessageTextProps> {
  constructor(props: MessageTextProps) {
    super(props);
  }

  protected render(): string {
    const { message, userId, date } = this.props;

    const isMyMessage = userId === store.getState().currentUser?.id.toString();
    if (isMyMessage) {
      return `
      <li class="message-text message-text_user-message">${message}
        <span class="message-text__date message-text__date_{{user-class}}">${date}</span>
      </li>
    `;
    }

    return `
      <li class="message-text message-text_">${message}
        <span class="message-text__date message-text__date_user-message">${date}</span>
      </li>
    `;
  }
}

export const MessageText = (props: MessageTextProps) => {
  return new MessageTextCmp(props);
};
