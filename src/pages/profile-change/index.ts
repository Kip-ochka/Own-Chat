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
  firstName: Block<InputSettingProps>;
  secondName: Block<InputSettingProps>;
  displayName: Block<InputSettingProps>;
  phoneNumber: Block<InputSettingProps>;
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
          blur: () => validateInput("email", REGEXPS.EMAIL, className),
        },
      }),
      login: InputSetting({
        id: "login",
        label: "Логин",
        placeholder: "Логин",
        events: {
          blur: () => validateInput("login", REGEXPS.LOGIN, className),
        },
      }),
      firstName: InputSetting({
        id: "firstName",
        label: "Имя",
        placeholder: "Имя",
        events: {
          blur: () => validateInput("firstName", REGEXPS.NAME, className),
        },
      }),
      secondName: InputSetting({
        id: "secondName",
        label: "Фамилия",
        placeholder: "Фамилия",
        events: {
          blur: () => validateInput("secondName", REGEXPS.NAME, className),
        },
      }),
      displayName: InputSetting({
        id: "displayName",
        label: "Имя в чате",
        placeholder: "Имя в чате",
        events: {
          blur: () => validateInput("displayName", REGEXPS.NICKNAME, className),
        },
      }),
      phoneNumber: InputSetting({
        id: "phoneNumber",
        label: "Телефон",
        placeholder: "Телефон",
        events: {
          blur: () => validateInput("phoneNumber", REGEXPS.PHONE, className),
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
                elementId: "firstName",
                regexp: REGEXPS.NAME,
                className,
              },
              {
                elementId: "secondName",
                regexp: REGEXPS.NAME,
                className,
              },
              {
                elementId: "displayName",
                regexp: REGEXPS.NICKNAME,
                className,
              },
              {
                elementId: "phoneNumber",
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
              {{{ firstName }}}
            </li>
            <li class="profile-change__field">
              {{{ secondName }}}
            </li>
            <li class="profile-change__field">
              {{{ displayName }}}
            </li>
            <li class="profile-change__field">
              {{{ phoneNumber }}}
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
