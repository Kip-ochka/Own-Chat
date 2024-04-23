import { Block } from "../../utils/Block.ts";
import { Input, InputProps } from "../input";
import { Button, ButtonProps } from "../button";
import { ModalOverlay } from "../modal-overlay";
import "../modal/modal.scss";

export type ModalAddUserProps = {
  onClick: () => void;
};

export type ModalAddUserBlock = {
  input: Block<InputProps>;
  button: Block<ButtonProps>;
  overlay: Block<{}>;
} & ModalAddUserProps;

class ModalAddUserCmp extends Block<ModalAddUserBlock> {
  constructor(props: ModalAddUserProps) {
    super({
      ...props,
      input: Input({
        id: "userAddLogin",
        type: "text",
        label: "Логин",
        placeholder: "Логин",
      }),
      button: Button({
        text: "Добавить",
        type: "submit",
        events: {
          click: () => {
            this.props.onClick();
          },
        },
      }),
      overlay: ModalOverlay(),
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="modal">
        {{{ overlay }}}
        <div class="modal__content">
          <h3 class="modal__title">Добавить пользователя</h3>
          {{{ input }}}
          {{{ button }}}
        </div>
      </div>
    `;
  }
}

export const ModalAddUser = (props: ModalAddUserProps) => {
  return new ModalAddUserCmp(props);
};
