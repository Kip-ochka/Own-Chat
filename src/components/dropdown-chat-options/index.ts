import { Block } from "../../utils/Block.ts";
import "../dropdown/dropdown.scss";

export type DropdownChatOptionsProps = {};

export type DropdownChatOptionsBlock = {} & DropdownChatOptionsProps;

class DropDownChatOptionsCmp extends Block<DropdownChatOptionsBlock> {
  constructor(props: DropdownChatOptionsProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    //language=hbs
    return `
      <ul class="dropdown dropdown_chat-options dropdown_close" id="options_dropdown">
        <li class="dropdown__item">
          <div class="dropdown__image dropdown__image_chat-options dropdown__image_add" ></div>
          <span class="dropdown__text">Добавить пользователя</span>
        </li>
        <li class="dropdown__item">
          <div class="dropdown__image dropdown__image_chat-options dropdown__image_cross" ></div>
          <span class="dropdown__text">Удалить пользователя</span>
        </li>
        <li class="dropdown__item">
          <span class="dropdown__text dropdown__text_delete">Удалить чат</span>
        </li>
      </ul>
    `;
  }
}

export const DropdownChatOptions = () => {
  return new DropDownChatOptionsCmp({});
};
