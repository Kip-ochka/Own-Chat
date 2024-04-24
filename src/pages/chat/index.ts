import { Block } from "../../utils/Block.ts";
import "./chat.scss";

import { InputSearch, InputSearchProps } from "../../components/input-search";

import {
  DropdownAddMedia,
  DropdownAddMediaProps,
} from "../../components/dropdown-add-media";
import {
  DropdownChatOptions,
  DropdownChatOptionsProps,
} from "../../components/dropdown-chat-options";
import {
  InputElement,
  InputElementProps,
} from "../../components/Input-element";

export type ChatPageBlock = {
  dropdownAddMedia: Block<DropdownAddMediaProps>;
  dropdownChatOptions: Block<DropdownChatOptionsProps>;
  inputSearch: Block<InputSearchProps>;
  chatMessageInput: Block<InputElementProps>;
};
export type ChatPageProps = {};

class ChatPageCmp extends Block<ChatPageBlock> {
  constructor() {
    super({
      dropdownAddMedia: DropdownAddMedia(),
      dropdownChatOptions: DropdownChatOptions(),
      inputSearch: InputSearch({}),
      chatMessageInput: InputElement({
        id: "message",
        className: "chats__input-message",
        placeholder: "Сообщение",
      }),
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="chats">
        {{{ dropdownAddMedia }}}
        {{{ dropdownChatOptions }}}
        <div class="chats__list-wrapper">
          <div class="chats__head">
            <a class="chats__link-to-profile" href="/">
              Профиль
              <div
                class="arrow-right"
              ></div>
            </a>
            {{{ inputSearch }}}
          </div>
          <ul class="chats__list">
            {{{ ChatItem name='Андрей' message='Изображение' date='1 Мая 2020' messageCount='4' }}}
            {{{ ChatItem name='Андрей' message='Изображение' date='1 Мая 2020' messageCount='4' }}}
            {{{ ChatItem name='Андрей' message='Изображение' date='1 Мая 2020' messageCount='4' }}}
            {{{ ChatItem name='Андрей' message='Изображение Изображение Изображение Изображение Изображение Изображение ' date='1 Мая 2020' messageCount='4' }}}
          </ul>
        </div>
        <div class="chats__current">
          <div class="chats__current-head">
            <div class="chats__current-avatar"></div>
            <span class="chats__current-name">Ваня</span>
            <button type="button" class="chats__options-button">
              <svg width="3" height="16" viewBox="0 0 3 16" fill="1E1E1E"
                   xmlns="http://www.w3.org/2000/svg">
                <circle cx="1.5" cy="2" r="1.5" />
                <circle cx="1.5" cy="8" r="1.5" />
                <circle cx="1.5" cy="14" r="1.5" />
              </svg>
            </button>
          </div>
          <ul class="chats__dialog">
            {{{ MessageDate date='19 июня' }}}
            {{{ MessageText date='11:12' message='Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'}}}
            {{{ MessageText date='11:12' user-class='user-message' message='Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'}}}
            {{{ MessageMedia date='11:12' user-class='user-message' src='src/assets/jpg/avatar.jpg' alt='avatar' }}}
          </ul>
          <form class="chats__form">

            <button class="chats__clip-button">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="#999999"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M9.70067 16.0141L17.2768 8.43793L18.2196 9.38074L10.6435 16.9569L9.70067 16.0141Z" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M17.5574 23.8708L25.1335 16.2946L26.0763 17.2374L18.5002 24.8136L17.5574 23.8708Z" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48303 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z" />
              </svg>
            </button>
            {{{ chatMessageInput }}}
            <button id="send-message" type="submit" class="chats__send-button"></button>
          </form>
        </div>
      </div>
    `;
  }
}

export const ChatPage = () => {
  return new ChatPageCmp();
};
