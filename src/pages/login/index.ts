import { Block } from "../../utils/Block.ts";
import "./login.scss";
import { Input, InputProps } from "../../components/input";
import { Button, ButtonProps } from "../../components/button";

import {
  REGEXPS,
  validateInput,
  validateInputs,
} from "../../utils/validators.ts";
import AuthController from "../../controllers/AuthController.ts";
import ChatController from "../../controllers/ChatController.ts";
import { Router } from "../../utils/Router.ts";
import { withStore } from "../../store";

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
          click: (e) => this.onSignIn(e, className),
        },
      }),
    });
  }

  componentDidMount() {
    AuthController.getUser().then(() => {
      const router = new Router();
      router.go("/messenger");
    });
  }

  onSignIn = (event: Event, className: string) => {
    event.preventDefault();
    const router = new Router();
    const { result, data } = validateInputs(
      { className, elementId: "login", regexp: REGEXPS.LOGIN },
      {
        className,
        elementId: "password",
        regexp: REGEXPS.PASSWORD,
      }
    );
    if (result) {
      const { login, password } = data;
      AuthController.signIn({ login, password })
        .then(() => {
          ChatController.getChats().then(() => {
            router.go("/messenger");
          });
        })
        .catch((error) => {
          if (error.reason === "User already in system") {
            router.go("/messenger");
          } else
            alert(
              `Ошибка выполнения запроса авторизации! ${error ? error.reason : ""}`
            );
        });
    }
  };

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
            {{{ Link className="login-page__link" href="/sign-up" text="Ещё не зарегистрированы?"}}}
          </div>
        </form>
      </div>
    `;
  }
}

export const LoginPage = () => {
  const withData = withStore((state) => state);
  return withData(LoginCmp);
};
