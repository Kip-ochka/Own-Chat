import { Block } from "../../utils/Block.ts";
import "./profile-password.scss";
import {
  InputSetting,
  InputSettingProps,
} from "../../components/input-setting";
import {
  REGEXPS,
  validateInput,
  validateInputs,
} from "../../utils/validators.ts";
import { Button, ButtonProps } from "../../components/button";

export type ProfilePasswordBlock = {
  oldPassword: Block<InputSettingProps>;
  newPassword: Block<InputSettingProps>;
  newPasswordRepeat: Block<InputSettingProps>;
  button: Block<ButtonProps>;
};

class ProfilePasswordCmp extends Block<ProfilePasswordBlock> {
  constructor() {
    const className = "test";
    super({
      oldPassword: InputSetting({
        id: "oldPassword",
        label: "Старый пароль",
        placeholder: "Старый пароль",
        type: "password",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "oldPassword",
              REGEXPS.PASSWORD,
              className
            );
            if (valid) {
              this.children.oldPassword.setProps({ errorText: "" });
            } else {
              this.children.oldPassword.setProps({
                errorText: "Введите корректный пароль.",
              });
            }
          },
        },
      }),
      newPassword: InputSetting({
        id: "newPassword",
        label: "Новый пароль",
        placeholder: "Новый пароль",
        type: "password",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "newPassword",
              REGEXPS.PASSWORD,
              className
            );
            if (valid) {
              this.children.newPassword.setProps({ errorText: "" });
            } else {
              this.children.newPassword.setProps({
                errorText: "Введите корректный пароль.",
              });
            }
          },
        },
      }),
      newPasswordRepeat: InputSetting({
        id: "newPasswordRepeat",
        label: "Новый пароль еще раз",
        placeholder: "Новый пароль еще раз",
        type: "password",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "newPasswordRepeat",
              REGEXPS.PASSWORD,
              className
            );
            if (valid) {
              this.children.newPasswordRepeat.setProps({ errorText: "" });
            } else {
              this.children.newPasswordRepeat.setProps({
                errorText: "Повторите корректный пароль.",
              });
            }
          },
        },
      }),
      button: Button({
        type: "submit",
        text: "Сохранить",
        events: {
          click: (event) => {
            event.preventDefault();
            const result = validateInputs(
              { className, elementId: "oldPassword", regexp: REGEXPS.PASSWORD },
              {
                className,
                elementId: "newPassword",
                regexp: REGEXPS.PASSWORD,
              },
              {
                className,
                elementId: "newPasswordRepeat",
                regexp: REGEXPS.PASSWORD,
              }
            );
            console.log(result);
          },
        },
      }),
    });
  }

  protected render(): string {
    //language=hbs
    return `
      <div class="profile-password-change__wrapper">
        {{{ BackButton }}}
        <form class="profile-password-change">
          <div class="profile-password-change__img-wrapper">
            <div class="profile-password-change__img" ></div>
          </div>
          <ul class="profile-password-change__fields">
            <li class="profile-password-change__field">
              {{{ oldPassword }}}
            </li>
            <li class="profile-password-change__field">
              {{{ newPassword }}}
            </li>
            <li class="profile-password-change__field">
              {{{ newPasswordRepeat  }}}
            </li>
          </ul>
          <div class="profile-password-change__button-wrapper">
            {{{ button }}}
          </div>
        </form>
      </div>
    `;
  }
}

export const ProfilePasswordChangePage = () => {
  return new ProfilePasswordCmp();
};
