import { Block } from "../../utils/Block.ts";
import "./profile-change.scss";
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

export type ProfileChangeBlock = {
  email: Block<InputSettingProps>;
  login: Block<InputSettingProps>;
  first_name: Block<InputSettingProps>;
  second_name: Block<InputSettingProps>;
  display_name: Block<InputSettingProps>;
  phone: Block<InputSettingProps>;
  button: Block<ButtonProps>;
};

class ProfileChangeCmp extends Block<ProfileChangeBlock> {
  constructor() {
    const className = "test";
    super({
      email: InputSetting({
        id: "email",
        label: "Почта",
        placeholder: "Почта",
        events: {
          blur: () => {
            const { valid } = validateInput("email", REGEXPS.EMAIL, className);
            if (valid) {
              this.children.email.setProps({ errorText: "" });
            } else {
              this.children.email.setProps({
                errorText: "Введите корректную почту",
              });
            }
          },
        },
      }),
      login: InputSetting({
        id: "login",
        label: "Логин",
        placeholder: "Логин",
        events: {
          blur: () => {
            const { valid } = validateInput("login", REGEXPS.LOGIN, className);
            if (valid) {
              this.children.login.setProps({ errorText: "" });
            } else {
              this.children.login.setProps({
                errorText: "Введите корректный логин.",
              });
            }
          },
        },
      }),
      first_name: InputSetting({
        id: "first_name",
        label: "Имя",
        placeholder: "Имя",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "first_name",
              REGEXPS.NAME,
              className
            );
            if (valid) {
              this.children.first_name.setProps({ errorText: "" });
            } else {
              this.children.first_name.setProps({
                errorText: "Введите корректное имя.",
              });
            }
          },
        },
      }),
      second_name: InputSetting({
        id: "second_name",
        label: "Фамилия",
        placeholder: "Фамилия",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "second_name",
              REGEXPS.NAME,
              className
            );
            if (valid) {
              this.children.second_name.setProps({ errorText: "" });
            } else {
              this.children.second_name.setProps({
                errorText: "Введите корректную фамилию.",
              });
            }
          },
        },
      }),
      display_name: InputSetting({
        id: "display_name",
        label: "Имя в чате",
        placeholder: "Имя в чате",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "display_name",
              REGEXPS.NICKNAME,
              className
            );
            if (valid) {
              this.children.display_name.setProps({ errorText: "" });
            } else {
              this.children.display_name.setProps({
                errorText: "Введите корректное имя в чате.",
              });
            }
          },
        },
      }),
      phone: InputSetting({
        id: "phone",
        label: "Телефон",
        placeholder: "Телефон",
        events: {
          blur: () => {
            const { valid } = validateInput("phone", REGEXPS.PHONE, className);
            if (valid) {
              this.children.phone.setProps({ errorText: "" });
            } else {
              this.children.phone.setProps({
                errorText: "Введите корректный телефон.",
              });
            }
          },
        },
      }),
      button: Button({
        text: "Сохранить",
        type: "submit",
        events: {
          click: (event) => {
            event.preventDefault();
            const result = validateInputs(
              {
                elementId: "email",
                regexp: REGEXPS.EMAIL,
                className,
              },
              {
                elementId: "login",
                regexp: REGEXPS.LOGIN,
                className,
              },
              {
                elementId: "first_name",
                regexp: REGEXPS.NAME,
                className,
              },
              {
                elementId: "second_name",
                regexp: REGEXPS.NAME,
                className,
              },
              {
                elementId: "display_name",
                regexp: REGEXPS.NICKNAME,
                className,
              },
              {
                elementId: "phone",
                regexp: REGEXPS.PHONE,
                className,
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
      <div class="profile-change__wrapper">
        {{{ BackButton }}}
        <form class="profile-change">
          <div class="profile-change__img-wrapper">
            <div class="profile-change__img" ></div>
          </div>
          <ul class="profile-change__fields">
            <li class="profile-change__field">
              {{{ email }}}
            </li>
            <li class="profile-change__field">
              {{{ login }}}
            </li>
            <li class="profile-change__field">
              {{{ first_name }}}
            </li>
            <li class="profile-change__field">
              {{{ second_name }}}
            </li>
            <li class="profile-change__field">
              {{{ display_name }}}
            </li>
            <li class="profile-change__field">
              {{{ phone }}}
            </li>
          </ul>
          <div class="profile-change__button-wrapper">
            {{{ button }}}
          </div>
        </form>
      </div>
    `;
  }
}

export const ProfileChangePage = () => {
  return new ProfileChangeCmp();
};
