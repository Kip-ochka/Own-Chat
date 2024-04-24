import { Block } from "../../utils/Block.ts";
import "../modal/modal.scss";
import { ModalOverlay } from "../modal-overlay";
import { Button, ButtonProps } from "../button";

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
      overlay: ModalOverlay(),
      button: Button({
        type: "submit",
        className: "",
        text: "Поменять",
        events: {
          click: () => {
            this.props.onClick();
          },
        },
      }),
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="modal">
        {{{ overlay }}}
        <div class="modal__content">
          <h3 class="modal__title">{{title}}</h3>
          <label for="uploadAvatar" class="change-avatar-label">
            Выбрать аватар с компьютера
          </label>
          <input id='avatar' name="avatar" class="change-avatar-input" type="file" />
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
