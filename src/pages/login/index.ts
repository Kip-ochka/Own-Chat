import { Block } from "../../utils/Block.ts";
import "./login.scss";
import { Input, InputProps } from "../../components/input";
import { Button, ButtonProps } from "../../components/button";

import {
  REGEXPS,
  validateInput,
  validateInputs,
} from "../../utils/validators.ts";

export type LoginBlock = {
  login: Block<InputProps>;
  password: Block<InputProps>;
  button: Block<ButtonProps>;
};

export type LoginProps = {};

class LoginCmp extends Block<LoginBlock> {
  constructor(props: LoginProps) {
    const className = "input__native-element_error";

    super({
      ...props,
      login: Input({
        id: "login",
        placeholder: "Логин",
        label: "Логин",
        events: {
          blur: () => {
            const { valid } = validateInput("login", REGEXPS.LOGIN, className);
            if (valid) {
              this.children.login.setProps({ errorText: "" });
            } else {
              this.children.login.setProps({
                errorText: "Введите корректный логин",
              });
            }
          },
        },
      }),
      password: Input({
        id: "password",
        placeholder: "Пароль",
        label: "Пароль",
        type: "password",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "password",
              REGEXPS.PASSWORD,
              "input__native-element_error"
            );
            if (valid) {
              this.children.password.setProps({ errorText: "" });
            } else {
              this.children.password.setProps({
                errorText: "Введите корректный логин",
              });
            }
          },
        },
      }),
      button: Button({
        type: "submit",
        text: "Войти",
        form: "login-form",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            const result = validateInputs(
              { className, elementId: "login-login", regexp: REGEXPS.LOGIN },
              {
                className,
                elementId: "login-password",
                regexp: REGEXPS.PASSWORD,
              }
            );
            console.log(result);
          },
        },
      }),
    });
  }

  render() {
    // language=hbs
    return `
      <div class="login-page">
        <form class="login-page__wrapper" id="login-form">
          <h1 class="login-page__title">Вход</h1>
          <div class="login-page__input-wrapper">
            {{{ login }}}
            {{{ password }}}
          </div>
          <div class="login-page__button-wrapper">
            {{{ button }}}
            <a class="login-page__link" href="/">Ещё не зарегистрированы?</a>
          </div>
        </form>
      </div>
    `;
  }
}

export const LoginPage = () => {
  return new LoginCmp({});
};
