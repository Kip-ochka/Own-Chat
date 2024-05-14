import { Block } from "../../utils/Block.ts";
import "../modal/modal.scss";
import { Input, InputProps } from "../input";
import { ModalOverlay } from "../modal-overlay";
import { Button, ButtonProps } from "../button";
import {
  REGEXPS,
  validateInput,
  validateInputs,
} from "../../utils/validators.ts";
import { store } from "../../store";
import UserController from "../../controllers/UserController.ts";
import ChatController from "../../controllers/ChatController.ts";
import { closeDeleteUser } from "../../utils/modalDeleteUser.ts";

export type ModalDeleteUserProps = {};

export type ModalDeleteUserBlock = {
  userLoginDelete: Block<InputProps>;
  overlay: Block<{}>;
  button: Block<ButtonProps>;
} & ModalDeleteUserProps;

class ModalDeleteUserCmp extends Block<ModalDeleteUserBlock> {
  constructor(props: ModalDeleteUserProps) {
    super({
      ...props,
      userLoginDelete: Input({
        id: "userLoginDelete",
        type: "text",
        label: "Логин",
        placeholder: "Логин",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "userLoginDelete",
              REGEXPS.LOGIN,
              "input__native-element_error"
            );
            if (valid) {
              this.children.userLoginDelete.setProps({ errorText: "" });
            } else {
              this.children.userLoginDelete.setProps({
                errorText: "Введите корректный логин",
              });
            }
          },
        },
      }),
      overlay: ModalOverlay({ events: { click: () => closeDeleteUser() } }),
      button: Button({
        type: "submit",
        className: "",
        text: "Удалить",
        events: {
          click: async (event) => {
            event.preventDefault();
            const { result, data } = validateInputs({
              className: "input__native-element_error",
              elementId: "userLoginDelete",
              regexp: REGEXPS.LOGIN,
            });
            const chatId = store.getState().currentChatId;
            const currentUser = store.getState().currentUser;
            if (result && chatId) {
              try {
                const searchedUser = await UserController.getUserByLogin(
                  data.userLoginDelete
                );
                if (!searchedUser || searchedUser.length === 0) {
                  alert("Мы не нашли такого пользователя");
                  return;
                }
                const deletedUserId = searchedUser[0].id;
                if (deletedUserId === currentUser!.id) {
                  alert("Нельзя удалить админа из чата");
                  return;
                }

                const chatUsers = await ChatController.getChatUsers(chatId);
                if (!chatUsers || chatUsers.length === 0) {
                  alert("Не смогли удалить пользователя");
                  return;
                }

                const inChat = chatUsers.some(
                  (user) => user.id === deletedUserId
                );

                if (inChat) {
                  ChatController.removeUserFromChat(
                    +chatId,
                    deletedUserId
                  ).then(() => {
                    closeDeleteUser();
                  });
                }
              } catch (e) {
                alert("Не смогли удалить пользователя");
              }
            } else {
              this.children.userLoginDelete.setProps({
                errorText: "Введите корректный логин",
              });
            }
          },
        },
      }),
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="modal modal__close" id="modal_delete_user">
        {{{ overlay }}}
        <div class="modal__content">
          <h3 class="modal__title">Удалить пользователя</h3>
          {{{ userLoginDelete }}}
          {{{ button }}}
        </div>
      </div>
    `;
  }
}

export const ModalDeleteUser = (props: ModalDeleteUserProps) => {
  return new ModalDeleteUserCmp(props);
};
