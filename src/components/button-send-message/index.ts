import { Block } from "../../utils/Block.ts";
import { REGEXPS, validateInputs } from "../../utils/validators.ts";
import { websocket } from "../../utils/WebSocets.ts";

class ButtonSendMessageCmp extends Block<{}> {
  constructor() {
    super({ events: { click: (e: Event) => this.onSendMessage(e) } });
  }

  protected onSendMessage(e: Event) {
    e.preventDefault();

    const { result, data } = validateInputs({
      elementId: "message",
      className: "valid",
      regexp: REGEXPS.MESSAGE,
    });

    if (result) {
      websocket.sendMessage(data.message);
    }
    const input = document.getElementById("message");
    if (input instanceof HTMLInputElement) {
      input.value = "";
      setTimeout(() => {
        input.focus();
      }, 200);
    }
  }

  protected render() {
    return `<button id="send-message" type="submit" class="chats__send-button"></button>`;
  }
}

export const ButtonSendMessage = () => {
  return new ButtonSendMessageCmp();
};
