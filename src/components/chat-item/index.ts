import { Block } from "../../utils/Block.ts";
import "./chat-item.scss";
import { store } from "../../store";
import { websocket } from "../../utils/WebSocets.ts";
import { scrollToLast } from "../../utils/scrollToLast.ts";

export type ChatItemProps = {
  id: number;
  name: string;
  date: string;
  message: string;
  messageCount: string;
  lastUserName: string;
  avatar: string;
  randomColor: string;
};

export type ChatItemBlock = {
  events: {
    click: () => void;
  };
} & ChatItemProps;

class ChatItemCmp extends Block<ChatItemBlock> {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: () => this.setCurrentChat(),
      },
    });
  }

  setCurrentChat = () => {
    const id = this.element.getAttribute("data-id");
    if (id) {
      store.set("currentChatId", id);
      websocket.connect();
      scrollToLast();
    }
  };

  protected render(): string {
    const {
      messageCount,
      id,
      message,
      randomColor,
      lastUserName,
      name,
      date,
      avatar,
    } = this.props;

    const activeClass =
      store.getState().currentChatId === id.toString() ? "active" : "";
    //language=hbs
    return `
      <li data-id="${id}" class="chat-item ${activeClass}" >
        ${
          avatar
            ? `<img src="https://ya-praktikum.tech/api/v2/resources${avatar}" alt="Автара" class="chat-item__avatar"/>`
            : `<div class="chat-item__avatar" style="background: ${randomColor}">${Array.from(this.props.name)[0]}</div>`
        }
        <div class="chat-item__wrapper">
          <div class="chat-item__section">
            <h3 class="chat-item__name">${name}</h3>
            <span class="chat-item__date">${date || ""}</span>
          </div>
          <div class="chat-item__section">
            <div class="chat-item__last-message">
              <p class="chat-item__message chat-item__message_name">${lastUserName ? lastUserName + ":" : ""}</p>
              <p class="chat-item__message">${message || ""}</p>
            </div>

            ${messageCount ? '<div class="chat-item__message-count">{{messageCount}}</div>' : ""}
          </div>
        </div>
      </li>
    `;
  }
}

export const ChatItem = (props: ChatItemProps) => {
  return new ChatItemCmp(props);
};
