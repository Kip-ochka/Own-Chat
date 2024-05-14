import { Block } from "../../utils/Block.ts";
import "../modal/modal.scss";
import { ModalOverlay } from "../modal-overlay";
import { Button, ButtonProps } from "../button";
import { closeModalAvatar } from "../../utils/modalAvatar.ts";
import UserController from "../../controllers/UserController.ts";

export type ModalChangeAvatarProps = {
  onClick: () => void;
};

export type ModalChangeAvatarBlock = {
  overlay: Block<{}>;
  button: Block<ButtonProps>;
} & ModalChangeAvatarProps;

class ModalChangeAvatarCmp extends Block<ModalChangeAvatarBlock> {
  constructor(props: ModalChangeAvatarProps) {
    super({
      ...props,
      overlay: ModalOverlay({
        events: {
          click: () => {
            closeModalAvatar();
          },
        },
      }),
      button: Button({
        type: "submit",
        className: "",
        text: "Поменять",
        events: {
          click: () => {
            const input = document.getElementById("avatar") as HTMLInputElement;
            if (!input) return;

            if (input.files && input.files.length > 0) {
              UserController.changeAvatar(input.files[0])
                .then(() => {
                  closeModalAvatar();
                })
                .catch((e) =>
                  alert("У нас не получилось поменять аватар" + " " + e.reason)
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
      <div class="modal modal__close" id="modal_avatar">
        {{{ overlay }}}
        <div class="modal__content">
          <h3 class="modal__title">Смена аватара</h3>
          <label for="uploadAvatar" class="change-avatar-label">
            Выбрать аватар с компьютера
          </label>
          {{{ InputElement id='avatar' name="avatar" class="change-avatar-input" type="file" multiple="false" }}}
          <div class="change-avatar-button">
            {{{ button }}}
            <span class="change-avatar-error">{{error}}</span>
          </div>
        </div>
      </div>
    `;
  }
}

export const ModalChangeAvatar = (props: ModalChangeAvatarProps) => {
  return new ModalChangeAvatarCmp(props);
};
