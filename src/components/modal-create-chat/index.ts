import { Block } from "../../utils/Block.ts";
import "../modal/modal.scss";
import { ModalOverlay } from "../modal-overlay";
import { Button, ButtonProps } from "../button";
import ChatController from "../../controllers/ChatController.ts";
import { closeCreateChat } from "../../utils/modalCreateChat.ts";
import { Input, InputProps } from "../input";
import {
  REGEXPS,
  validateInput,
  validateInputs,
} from "../../utils/validators.ts";

export type ModalCreateChatProps = {
  onClick: () => void;
};

export type ModalCreateChatBlock = {
  overlay: Block;
  button: Block<ButtonProps>;
  createChatInput: Block<InputProps>;
} & ModalCreateChatProps;

class ModalCreateChatCmp extends Block<ModalCreateChatBlock> {
  constructor(props: ModalCreateChatProps) {
    super({
      ...props,
      overlay: ModalOverlay({
        events: {
          click: () => {
            closeCreateChat();
          },
        },
      }),
      createChatInput: Input({
        id: "createChatInput",
        placeholder: "Название чата",
        label: "Название чата",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "createChatInput",
              REGEXPS.MESSAGE,
              "input__native-element_error"
            );
            if (valid) {
              this.children.createChatInput.setProps({ errorText: "" });
            } else {
              this.children.createChatInput.setProps({
                errorText: "Название чата не может быть пустым",
              });
            }
          },
        },
      }),
      button: Button({
        type: "submit",
        className: "",
        text: "Создать",
        events: {
          click: () => {
            const { result, data } = validateInputs({
              elementId: "createChatInput",
              regexp: REGEXPS.MESSAGE,
              className: "input__native-element_error",
            });
            if (!result) return;

            if (data.createChatInput) {
              ChatController.createChat(data.createChatInput)
                .then(() => {
                  ChatController.getChats().then(() => {
                    closeCreateChat();
                  });
                })
                .catch((e) =>
                  alert("У нас не получилось создать чат" + " " + e.reason)
                );
            }
          },
        },
      }),
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="modal modal__close" id="modal_create_chat">
        {{{ overlay }}}
        <div class="modal__content">
          <h3 class="modal__title">Введите название чата</h3>
          {{{ createChatInput }}}
          <div class="change-avatar-button">
            {{{ button }}}
            <span class="change-avatar-error">{{error}}</span>
          </div>
        </div>
      </div>
    `;
  }
}

export const ModalCreateChat = (props: ModalCreateChatProps) => {
  return new ModalCreateChatCmp(props);
};
