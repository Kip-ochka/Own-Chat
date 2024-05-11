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
import AuthController from "../../controllers/AuthController.ts";
import { Router } from "../../utils/Router.ts";
import { withStore } from "../../store";
import UserController from "../../controllers/UserController.ts";

export type ProfileData = {
  id?: number;
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
  avatar?: string;
};

export type ProfilePasswordBlock = {
  oldPassword: Block<InputSettingProps>;
  newPassword: Block<InputSettingProps>;
  newPasswordRepeat: Block<InputSettingProps>;
  button: Block<ButtonProps>;
} & ProfileData;

class ProfilePasswordCmp extends Block<ProfilePasswordBlock> {
  constructor(props: ProfileData) {
    const className = "test";
    super({
      ...props,
      oldPassword: InputSetting({
        id: "oldPassword",
        label: "Старый пароль",
        placeholder: "Старый пароль",
        type: "password",
        regexp: new RegExp(REGEXPS.PASSWORD),
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
        regexp: new RegExp(REGEXPS.PASSWORD),
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
        regexp: new RegExp(REGEXPS.PASSWORD),
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
            const { result, data } = validateInputs(
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
            if (result && data.newPassword === data.newPasswordRepeat) {
              const { oldPassword, newPassword } = data;
              UserController.changePassword({ oldPassword, newPassword })
                .then(() => alert("Смена пароля удалась!"))
                .catch((e) =>
                  alert("Смена пароля не удалась! Причина:" + e.reason)
                );
            }
          },
        },
      }),
    });
  }

  componentDidMount() {
    AuthController.getUser().catch(() => new Router().go("/"));
  }

  protected render(): string {
    const { avatar } = this.props;
    if (!this.props || !this.props.id) {
      return `<div class="wrapper"><span class="loader"></span></div>`;
    }
    //language=hbs
    return `
      <div class="profile-password-change__wrapper">
        {{{ BackButton  href='/messenger' }}}
        <form class="profile-password-change">
          <div class="profile-password-change__img-wrapper">
            ${avatar ? `<img src=${"https://ya-praktikum.tech/api/v2/resources" + avatar} alt="Автара" class="profile__img"/>` : '<div class="profile__img"></div>'}
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
  const withUser = withStore((state) => ({ ...state.currentUser }));
  return withUser(ProfilePasswordCmp);
};
