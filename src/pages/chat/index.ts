import { Block } from "../../utils/Block.ts";
import "./chat.scss";

import {
  DropdownChatOptions,
  DropdownChatOptionsProps,
} from "../../components/dropdown-chat-options";
import {
  InputElement,
  InputElementProps,
} from "../../components/Input-element";
import AuthController from "../../controllers/AuthController.ts";
import { Router } from "../../utils/Router.ts";
import { Chat, Message, store, User, withStore } from "../../store";
import ChatController from "../../controllers/ChatController.ts";
import { Button, ButtonProps } from "../../components/button";
import { InputSearch, InputSearchBlock } from "../../components/input-search";
import { openCreateChat } from "../../utils/modalCreateChat.ts";
import { DropdownOverlay } from "../../components";
import { DropdownOverlayProps } from "../../components/dropdown-overlay";
import { optionsDropdownToggle } from "../../utils/optionsDropdown.ts";

export type ChatPageProps = {
  currentChatId: string;
  currentUser?: User;
  chatList: Chat[];
  messageList: Message[];
  searchValue: string;
};

export type ChatPageBlock = {
  dropdownChatOptions: Block<DropdownChatOptionsProps>;
  inputSearch: Block<InputSearchBlock>;
  chatMessageInput: Block<InputElementProps>;
  createChatButton: Block<ButtonProps>;
  dropdownOverlay: Block<DropdownOverlayProps>;
} & ChatPageProps;

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const arrayOfRandomColors = [...Array(100)].map(randomColor);

class ChatPageCmp extends Block<ChatPageBlock> {
  constructor(props: ChatPageProps) {
    super({
      ...props,
      createChatButton: Button({
        type: "button",
        text: "Создать чат",
        className: "chats__create-button",
        events: {
          click: () => {
            openCreateChat();
          },
        },
      }),
      dropdownChatOptions: DropdownChatOptions(),
      dropdownOverlay: DropdownOverlay({
        events: {
          click: (event) => {
            optionsDropdownToggle(event);
          },
        },
      }),
      inputSearch: InputSearch({
        events: {
          input: (event) => {
            if (event.target instanceof HTMLInputElement) {
              store.set("searchValue", event.target.value);
              event.target.focus();
            }
          },
        },
      }),
      chatMessageInput: InputElement({
        id: "message",
        className: "chats__input-message",
        placeholder: "Сообщение",
      }),
    });
  }

  componentDidMount() {
    const router = new Router();
    ChatController.getChats()
      .then(() => {
        AuthController.getUser().catch(() => router.go("/"));
      })
      .catch(() => {
        router.go("/");
      });
  }

  renderChatList() {
    const { chatList } = this.props;
    if (!chatList || chatList.length === 0) {
      return "";
    }
    const searchValue = store.getState().searchValue;
    return chatList
      .filter((chat) => {
        if (!searchValue) return true;
        return chat.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map((chat, index) => {
        let lastMessageTime;
        const lastMessage = !chat.last_message?.content
          ? undefined
          : `"${chat.last_message?.content}"`;
        const lastUsername = !chat.last_message?.user?.display_name
          ? undefined
          : `"${chat.last_message?.user?.display_name}"`;
        const unreadMessagesCount = !chat.unread_count
          ? undefined
          : `"${chat.unread_count}"`;

        if (chat.last_message?.time) {
          lastMessageTime = `"${new Date(chat.last_message?.time).toLocaleTimeString()}"`;
        }
        return `
          {{{ ChatItem
           id="${chat.id}"
           name="${chat.title}"
           message=${lastMessage}
           date=${lastMessageTime}
           messageCount=${unreadMessagesCount}
           lastUserName=${lastUsername}
           avatar="${chat.last_message?.user?.avatar}"
           randomColor="${arrayOfRandomColors[index]}"
           }}}
        `;
      })
      .join("");
  }

  renderMessageList() {
    const { messageList } = this.props;
    if (!messageList || messageList.length === 0) {
      return "";
    }
    return this.props.messageList
      .map((message) => {
        const { user_id, time, content } = message;
        return `{{{
        MessageText
        message="${content}"
        date="${new Date(time).toLocaleTimeString()}"
        userId="${user_id}"
      }}}`;
      })
      .join("");
  }

  get isAdmin() {
    const { chatList, currentChatId, currentUser } = this.props;
    if (currentChatId && currentUser) {
      const chat = chatList.find((item) => String(item.id) === currentChatId);

      return chat?.created_by === currentUser.id;
    }
    return false;
  }

  protected render(): string {
    const { currentUser } = this.props;

    // language=hbs
    return `
      <div class="chats">
        {{{ ModalCreateChat }}}
        {{{ ModalAddUser }}}
        {{{ ModalDeleteUser }}}
        {{{ dropdownChatOptions }}}
        {{{ dropdownOverlay }}}
        <div class="chats__list-wrapper">
          <div class="chats__head">
            <a class="chats__link-to-profile" href="/settings">
              Профиль
              <div
                class="arrow-right"
              ></div>
            </a>
            {{{ createChatButton }}}
            {{{ inputSearch }}}
          </div>
          <ul class="chats__list">
            ${this.renderChatList()}
          </ul>
        </div>
        <div class="chats__current">
          <div class="chats__current-head">
            ${currentUser ? `<img src=${"https://ya-praktikum.tech/api/v2/resources" + currentUser.avatar} alt="Автара" class="chats__current-avatar"/>` : '<div class="chats__current-avatar"></div>'}
            <span
              class="chats__current-name">${currentUser?.display_name || ""}</span>
              ${this.isAdmin ? "{{{ ButtonOpenChatOptions }}}" : ""}
          </div>
          <ul class="chats__dialog">
            ${this.props.currentChatId ? this.renderMessageList() : ""}
          </ul>
          <form class="chats__form">
<!--            <button class="chats__clip-button">-->
<!--              <svg width="32" height="32" viewBox="0 0 32 32" fill="#999999"-->
<!--                   xmlns="http://www.w3.org/2000/svg">-->
<!--                <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                      d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z" />-->
<!--                <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                      d="M9.70067 16.0141L17.2768 8.43793L18.2196 9.38074L10.6435 16.9569L9.70067 16.0141Z" />-->
<!--                <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                      d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" />-->
<!--                <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                      d="M17.5574 23.8708L25.1335 16.2946L26.0763 17.2374L18.5002 24.8136L17.5574 23.8708Z" />-->
<!--                <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                      d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z" />-->
<!--                <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                      d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48303 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z" />-->
<!--                <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                      d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z" />-->
<!--              </svg>-->
<!--            </button>-->
            ${this.props.currentChatId ? "{{{ chatMessageInput }}}{{{ ButtonSendMessage }}}" : ""}
          </form>
        </div>
      </div>
    `;
  }
}

export const ChatPage = () => {
  const withChats = withStore((state) => ({
    currentChatId: state.currentChatId,
    currentUser: state.currentUser,
    chatList: state.chatList || [],
    messageList: state.messageList || [],
    searchValue: state.searchValue || "",
  }));

  return withChats(ChatPageCmp);
};
