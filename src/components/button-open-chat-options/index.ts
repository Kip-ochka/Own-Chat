import { Block } from "../../utils/Block.ts";
import { optionsDropdownToggle } from "../../utils/optionsDropdown.ts";

export type ButtonOpenChatOptionsBlock = {
  events: {
    click: (event: Event) => void;
  };
};

class ButtonOpenChatOptionsCmp extends Block<ButtonOpenChatOptionsBlock> {
  constructor() {
    super({
      events: {
        click: (event: Event) => {
          optionsDropdownToggle(event);
        },
      },
    });
  }

  protected render() {
    return `
      <button type="button" class="chats__options-button">
        <svg width="3" height="16" viewBox="0 0 3 16" fill="1E1E1E"
             xmlns="http://www.w3.org/2000/svg">
          <circle cx="1.5" cy="2" r="1.5" />
          <circle cx="1.5" cy="8" r="1.5" />
          <circle cx="1.5" cy="14" r="1.5" />
        </svg>
      </button>
    `;
  }
}

export const ButtonOpenChatOptions = () => {
  return new ButtonOpenChatOptionsCmp();
};
