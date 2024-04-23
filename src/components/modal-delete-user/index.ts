import { Block } from "../../utils/Block.ts";
import "../modal/modal.scss";
import { Input, InputProps } from "../input";
import { ModalOverlay } from "../modal-overlay";
import { Button, ButtonProps } from "../button";

export type ModalDeleteUserProps = {
  onDeleteUser: () => void;
};

export type ModalDeleteUserBlock = {
  input: Block<InputProps>;
  overlay: Block<{}>;
  button: Block<ButtonProps>;
} & ModalDeleteUserProps;

class ModalDeleteUserCmp extends Block<ModalDeleteUserBlock> {
  constructor(props: ModalDeleteUserProps) {
    super({
      ...props,
      input: Input({
        label: "Логин",
        id: "userLoginDelete",
        className: "",
        value: "",
        type: "text",
        errorText: "",
        placeholder: "Логин",
        events: {
          change: (event: Event) => {
            if (!(event.target instanceof HTMLInputElement)) return;
            this.children.input.setProps({ value: event.target.value });
          },
        },
      }),
      overlay: ModalOverlay(),
      button: Button({
        type: "submit",
        className: "",
        text: "Удалить",
        events: {
          click: () => {
            this.props.onDeleteUser();
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
        <h3 class="modal__title">Удалить пользователя</h3>
        {{{ input }}}
        {{{ button }}}
      </div>
    </div>
    `;
  }
}

export const ModalDeleteUser = (props: ModalDeleteUserProps) => {
  return new ModalDeleteUserCmp(props);
};
