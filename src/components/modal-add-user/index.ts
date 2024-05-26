import { Block } from "../../utils/Block.ts";
import { Input, InputProps } from "../input";
import { Button, ButtonProps } from "../button";
import { ModalOverlay } from "../modal-overlay";
import "../modal/modal.scss";
import {
  REGEXPS,
  validateInput,
  validateInputs,
} from "../../utils/validators.ts";
import ChatController from "../../controllers/ChatController.ts";
import UserController from "../../controllers/UserController.ts";
import { store } from "../../store";
import { closeAddUser } from "../../utils/modalAddUser.ts";

export type ModalAddUserProps = object;

export type ModalAddUserBlock = {
  userAddLogin: Block<InputProps>;
  button: Block<ButtonProps>;
  overlay: Block;
} & ModalAddUserProps;

class ModalAddUserCmp extends Block<ModalAddUserBlock> {
  constructor(props: ModalAddUserProps) {
    super({
      ...props,
      userAddLogin: Input({
        id: "userAddLogin",
        type: "text",
        label: "Логин",
        placeholder: "Логин",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "userAddLogin",
              REGEXPS.LOGIN,
              "input__native-element_error"
            );
            if (valid) {
              this.children.userAddLogin.setProps({ errorText: "" });
            } else {
              this.children.userAddLogin.setProps({
                errorText: "Введите корректный логин",
              });
            }
          },
        },
      }),
      button: Button({
        text: "Добавить",
        type: "submit",
        events: {
          click: (event) => {
            event.preventDefault();
            const { result, data } = validateInputs({
              className: "input__native-element_error",
              elementId: "userAddLogin",
              regexp: REGEXPS.LOGIN,
            });
            const chatId = store.getState().currentChatId;
            if (result && chatId) {
              this.children.userAddLogin.setProps({ errorText: "" });
              UserController.getUserByLogin(data.userAddLogin).then((res) => {
                if (res.length === 0) {
                  alert("Такого юзера не нашлось");
                  return;
                }
                ChatController.addUserToChat(+chatId, res[0].id)
                  .then(() => {
                    closeAddUser();
                  })
                  .catch(() =>
                    alert("Нашли юзера, но не смогли добавить в чат")
                  );
              });
            } else {
              this.children.userAddLogin.setProps({
                errorText: "Введите корректный логин",
              });
            }
          },
        },
      }),
      overlay: ModalOverlay({
        events: {
          click: () => {
            closeAddUser();
          },
        },
      }),
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="modal modal__close" id="modal_add_user">
        {{{ overlay }}}
        <div class="modal__content">
          <h3 class="modal__title">Добавить пользователя</h3>
          {{{ userAddLogin }}}
          {{{ button }}}
        </div>
      </div>
    `;
  }
}

export const ModalAddUser = (props: ModalAddUserProps) => {
  return new ModalAddUserCmp(props);
};
