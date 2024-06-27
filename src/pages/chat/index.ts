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
    if (!chatList) {
      return '<div class="wrapper"><span class="loader"></span></div>';
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
           avatar="${chat.avatar || ""}"
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
    if (!this.props || !this.props.currentUser?.id) {
      return `<div class="wrapper"><span class="loader"></span></div>`;
    }
    // language=hbs
    return `
      <div class="chats">
        {{{ ModalCreateChat }}}
        {{{ ModalAddUser }}}
        {{{ ModalDeleteUser }}}
        {{{ ModalDeleteChat }}}
        {{{ dropdownChatOptions }}}
        {{{ dropdownOverlay }}}
        <div class="chats__list-wrapper">
          <div class="chats__head">
            {{{Link
              className="chats__link-to-profile"
              href="/settings" text="Профиль"
              innerHTML='<div
                class="arrow-right"
              ></div>' }}}
            {{{ createChatButton }}}
            {{{ inputSearch }}}
          </div>
          <ul class="chats__list">
            ${this.renderChatList()}
          </ul>
        </div>
        <div class="chats__current">
          <div class="chats__current-head">
            ${currentUser&&currentUser.avatar ? `<img src=${"https://ya-praktikum.tech/api/v2/resources" + currentUser.avatar} alt="Автара" class="chats__current-avatar"/>` : '<div class="chats__current-avatar"></div>'}
            <span
              class="chats__current-name">${currentUser?.display_name || ""}</span>
              ${this.isAdmin ? "{{{ ButtonOpenChatOptions }}}" : ""}
          </div>
          <ul class="chats__dialog">
            ${this.props.currentChatId ? this.renderMessageList() : '<div class="wrapper">Выберите или создайте чат!</div>'}
          </ul>
          <form class="chats__form">
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
