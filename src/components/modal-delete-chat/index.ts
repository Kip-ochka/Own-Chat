import { Block } from "../../utils/Block.ts";
import { ModalOverlay, ModalOverlayProps } from "../modal-overlay";
import { Button, ButtonProps } from "../button";
import { closeDeleteChat } from "../../utils/modalDeleteChat.ts";
import ChatController from "../../controllers/ChatController.ts";
import { store } from "../../store";

export type ModalDeleteChatBlock = {
  overlay: Block<ModalOverlayProps>;
  button: Block<ButtonProps>;
};

class ModalDeleteChatCmp extends Block<ModalDeleteChatBlock> {
  constructor() {
    super({
      overlay: ModalOverlay({
        events: {
          click: () => {
            closeDeleteChat();
          },
        },
      }),
      button: Button({
        text: "Подтвердить удаление",
        events: {
          click: () => {
            const id = store.getState().currentChatId;
            if (id) {
              ChatController.deleteChat(id)
                .then(() => {
                  ChatController.getChats().then(() => {
                    closeDeleteChat();
                    store.set("currentChatId", "");
                  });
                })
                .catch(() => alert("Не смогли удалить чат"));
              return;
            }
            alert("Сперва выберите чат!");
          },
        },
      }),
    });
  }

  protected render() {
    return `
      <div class="modal modal__close" id="modal_delete_chat">
        {{{ overlay }}}
        <div class="modal__content">
          <h3 class="modal__title">Вы уверены?</h3>
          <div class="change-avatar-button">
            {{{ button }}}
          </div>
        </div>
      </div>
    `;
  }
}

export const ModalDeleteChat = () => {
  return new ModalDeleteChatCmp();
};
