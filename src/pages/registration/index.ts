import { Block } from "../../utils/Block.ts";
import "./registration.scss";
import { Input, InputProps } from "../../components/input";
import {
  REGEXPS,
  validateInput,
  validateInputs,
} from "../../utils/validators.ts";
import { Button, ButtonProps } from "../../components/button";

export type RegistrationBlock = {
  email: Block<InputProps>;
  login: Block<InputProps>;
  firstName: Block<InputProps>;
  secondName: Block<InputProps>;
  phoneNumber: Block<InputProps>;
  password: Block<InputProps>;
  passwordRepeat: Block<InputProps>;
  button: Block<ButtonProps>;
};

class RegistrationCmp extends Block<RegistrationBlock> {
  constructor() {
    const className = "input__native-element_error";

    super({
      email: Input({
        id: "registration-email",
        label: "Почта",
        placeholder: "Почта",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "registration-email",
              REGEXPS.EMAIL,
              className
            );
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
      login: Input({
        id: "registration-login",
        label: "Логин",
        placeholder: "Логин",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "registration-login",
              REGEXPS.LOGIN,
              className
            );
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
      firstName: Input({
        id: "registration-first-name",
        label: "Имя",
        placeholder: "Имя",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "registration-first-name",
              REGEXPS.NAME,
              className
            );
            if (valid) {
              this.children.firstName.setProps({ errorText: "" });
            } else {
              this.children.firstName.setProps({
                errorText: "Введите корректное имя.",
              });
            }
          },
        },
      }),
      secondName: Input({
        id: "registration-second-name",
        label: "Фамилия",
        placeholder: "Фамилия",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "registration-second-name",
              REGEXPS.NAME,
              className
            );
            if (valid) {
              this.children.secondName.setProps({ errorText: "" });
            } else {
              this.children.secondName.setProps({
                errorText: "Введите корректную фамилию.",
              });
            }
          },
        },
      }),
      phoneNumber: Input({
        id: "registration-phone-number",
        label: "Телефон",
        placeholder: "Телефон",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "registration-phone-number",
              REGEXPS.PHONE,
              className
            );
            if (valid) {
              this.children.phoneNumber.setProps({ errorText: "" });
            } else {
              this.children.phoneNumber.setProps({
                errorText: "Введите корректный номер телефона.",
              });
            }
          },
        },
      }),
      password: Input({
        id: "registration-password",
        label: "Пароль",
        placeholder: "Пароль",
        type: "password",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "registration-password",
              REGEXPS.PASSWORD,
              className
            );
            if (valid) {
              this.children.password.setProps({ errorText: "" });
            } else {
              this.children.password.setProps({
                errorText: "Введите корректный пароль.",
              });
            }
          },
        },
      }),
      passwordRepeat: Input({
        id: "registration-password-repeat",
        label: "Пароль (ещё раз)",
        placeholder: "Пароль (ещё раз)",
        type: "password",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "registration-password-repeat",
              REGEXPS.PASSWORD,
              className
            );

            if (valid) {
              this.children.passwordRepeat.setProps({ errorText: "" });
            } else {
              this.children.passwordRepeat.setProps({
                errorText: "Пароль не совпадает или не корректен.",
              });
            }
          },
        },
      }),
      button: Button({
        text: "Зарегистрироваться",
        type: "submit",
        events: {
          click: (event) => {
            event.preventDefault();
            const res = validateInputs(
              {
                className,
                elementId: "registration-email",
                regexp: REGEXPS.EMAIL,
              },
              {
                className,
                elementId: "registration-login",
                regexp: REGEXPS.LOGIN,
              },
              {
                className,
                elementId: "registration-first-name",
                regexp: REGEXPS.NAME,
              },
              {
                className,
                elementId: "registration-second-name",
                regexp: REGEXPS.NAME,
              },
              {
                className,
                elementId: "registration-phone-number",
                regexp: REGEXPS.PHONE,
              },
              {
                className,
                elementId: "registration-password",
                regexp: REGEXPS.PASSWORD,
              },
              {
                className,
                elementId: "registration-password-repeat",
                regexp: REGEXPS.PASSWORD,
              }
            );
            console.log(res);
          },
        },
      }),
    });
  }

  protected render(): string {
    //language=hbs
    return `
      <div class="register-page">
        <form class="register-page__wrapper">
          <h1 class="register-page__title">Регистрация</h1>
          <div class="register-page__input-wrapper">
            {{{ email }}}
            {{{ login }}}
            {{{ firstName }}}
            {{{ secondName }}}
            {{{ phoneNumber }}}
            {{{ password }}}
            {{{ passwordRepeat }}}
          </div>
          <div class="register-page__button-wrapper">
            {{{ button }}}
            <a class="register-page__link" href="../login/login.hbs">Войти</a>
          </div>
        </form>
      </div>
    `;
  }
}

export const RegistrationPage = () => {
  return new RegistrationCmp();
};
