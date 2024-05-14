import { Block } from "../../utils/Block.ts";
import "../dropdown/dropdown.scss";
import { ButtonChatOption, ButtonChatOptionProps } from "../button-chat-option";
import { openAddUser } from "../../utils/modalAddUser.ts";
import { optionsDropdownToggle } from "../../utils/optionsDropdown.ts";
import { openDeleteUser } from "../../utils/modalDeleteUser.ts";
import { openDeleteChat } from "../../utils/modalDeleteChat.ts";

export type DropdownChatOptionsProps = {};

export type DropdownChatOptionsBlock = {
  addUserButton: Block<ButtonChatOptionProps>;
  removeUserButton: Block<ButtonChatOptionProps>;
  deleteChatButton: Block<ButtonChatOptionProps>;
} & DropdownChatOptionsProps;

class DropDownChatOptionsCmp extends Block<DropdownChatOptionsBlock> {
  constructor(props: DropdownChatOptionsProps) {
    super({
      ...props,
      addUserButton: ButtonChatOption({
        childrenHTML: `<div class="dropdown__image dropdown__image_chat-options dropdown__image_add" ></div><span class="dropdown__text">Добавить пользователя</span>`,
        events: {
          click: (event) => {
            openAddUser();
            optionsDropdownToggle(event);
          },
        },
      }),
      removeUserButton: ButtonChatOption({
        childrenHTML: ` <div class="dropdown__image dropdown__image_chat-options dropdown__image_cross" ></div>
          <span class="dropdown__text">Удалить пользователя</span>`,
        events: {
          click: (event) => {
            openDeleteUser();
            optionsDropdownToggle(event);
          },
        },
      }),
      deleteChatButton: ButtonChatOption({
        childrenHTML: `<span class="dropdown__text dropdown__text_delete">Удалить чат</span>`,
        events: {
          click: (event) => {
            openDeleteChat();
            optionsDropdownToggle(event);
          },
        },
      }),
    });
  }

  protected render(): string {
    //language=hbs
    return `
      <ul class="dropdown dropdown_chat-options dropdown_close" id="options_dropdown">
        <li class="dropdown__item">
          {{{addUserButton}}}
        </li>
        <li class="dropdown__item">
          {{{removeUserButton}}}
        </li>
        <li class="dropdown__item">
          {{{deleteChatButton}}}
        </li>
      </ul>
    `;
  }
}

export const DropdownChatOptions = () => {
  return new DropDownChatOptionsCmp({});
};
