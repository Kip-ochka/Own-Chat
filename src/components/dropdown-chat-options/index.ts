import { Block } from "../../utils/Block.ts";
import "../dropdown/dropdown.scss";
import { ButtonChatOption, ButtonChatOptionProps } from "../button-chat-option";

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
          click: () => {
            console.log(1);
          },
        },
      }),
      removeUserButton: ButtonChatOption({
        childrenHTML: ` <div class="dropdown__image dropdown__image_chat-options dropdown__image_cross" ></div>
          <span class="dropdown__text">Удалить пользователя</span>`,
        events: {
          click: () => {
            console.log(2);
          },
        },
      }),
      deleteChatButton: ButtonChatOption({
        childrenHTML: `<span class="dropdown__text dropdown__text_delete">Удалить чат</span>`,
        events: {
          click: () => {
            console.log(3);
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
