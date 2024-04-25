import { Block } from "../../utils/Block.ts";
import "../dropdown/dropdown.scss";

export type DropdownChatOptionsProps = {};

class DropDownChatOptionsCmp extends Block<DropdownChatOptionsProps> {
  constructor(props: DropdownChatOptionsProps) {
    super(props);
  }

  protected render(): string {
    return `
      <ul class="dropdown dropdown_chat-options">
        <li class="dropdown__item">
          <div class="dropdown__image dropdown__image_chat-options dropdown__image_add" ></div>
          <span class="dropdown__text">Добавить пользователя</span>
        </li>
        <li class="dropdown__item">
          <div class="dropdown__image dropdown__image_chat-options dropdown__image_cross" ></div>
          <span class="dropdown__text">Удалить пользователя</span>
        </li>
      </ul>
    `;
  }
}

export const DropdownChatOptions = () => {
  return new DropDownChatOptionsCmp({});
};
