import { Block } from "../../utils/Block.ts";
import "./chat-item.scss";

export interface ChatItemProps {
  name: string;
  date: string;
  message: string;
  messageCount: string;
}

class ChatItemCmp extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props);
  }

  protected render(): string {
    //language=hbs
    return `
      <li class="chat-item">
        <div class="chat-item__avatar" ></div>
        <div class="chat-item__wrapper">
          <div class="chat-item__section">
            <h3 class="chat-item__name">{{name}}</h3>
            <span class="chat-item__date">{{date}}</span>
          </div>
          <div class="chat-item__section">
            <p class="chat-item__message">{{message}}</p>
            <div class="chat-item__message-count">{{messageCount}}</div>
          </div>
        </div>
      </li>
    `;
  }
}

export const ChatItem = (props: ChatItemProps) => {
  return new ChatItemCmp(props);
};
