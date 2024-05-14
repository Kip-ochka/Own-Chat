import { Block } from "../../utils/Block.ts";
import "./registration.scss";
import { Input, InputProps } from "../../components/input";
import {
  REGEXPS,
  validateInput,
  validateInputs,
} from "../../utils/validators.ts";
import { Button, ButtonProps } from "../../components/button";
import AuthController from "../../controllers/AuthController.ts";
import { Router } from "../../utils/Router.ts";

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
      login: Input({
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
      firstName: Input({
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
        id: "phone",
        label: "Телефон",
        placeholder: "Телефон",
        events: {
          blur: () => {
            const { valid } = validateInput("phone", REGEXPS.PHONE, className);
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
        id: "password",
        label: "Пароль",
        placeholder: "Пароль",
        type: "password",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "password",
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
        id: "password_repeat",
        label: "Пароль (ещё раз)",
        placeholder: "Пароль (ещё раз)",
        type: "password",
        events: {
          blur: () => {
            const { valid } = validateInput(
              "password_repeat",
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
          click: (event) => this.signUp(event, className),
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

  signUp = (event: MouseEvent, className: string) => {
    event.preventDefault();
    const { result, data } = validateInputs(
      {
        className,
        elementId: "email",
        regexp: REGEXPS.EMAIL,
      },
      {
        className,
        elementId: "login",
        regexp: REGEXPS.LOGIN,
      },
      {
        className,
        elementId: "first_name",
        regexp: REGEXPS.NAME,
      },
      {
        className,
        elementId: "second_name",
        regexp: REGEXPS.NAME,
      },
      {
        className,
        elementId: "phone",
        regexp: REGEXPS.PHONE,
      },
      {
        className,
        elementId: "password",
        regexp: REGEXPS.PASSWORD,
      },
      {
        className,
        elementId: "password_repeat",
        regexp: REGEXPS.PASSWORD,
      }
    );
    const {
      email,
      login,
      password,
      first_name,
      second_name,
      phone,
      password_repeat,
    } = data;

    if (result && password === password_repeat) {
      const router = new Router();
      AuthController.signUp({
        email,
        login,
        password,
        first_name,
        second_name,
        phone,
      })
        .then(() => router.go("/messenger"))
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

  protected render(): string {
    //language=hbs
    return `
      <div class="register-page">
        <form class="register-page-wrapper">
          <h1 class="register-page-title">Регистрация</h1>
          <div class="register-page-input-wrapper">
            {{{ email }}}
            {{{ login }}}
            {{{ firstName }}}
            {{{ secondName }}}
            {{{ phoneNumber }}}
            {{{ password }}}
            {{{ passwordRepeat }}}
          </div>
          <div class="register-page-button-wrapper">
            {{{ button }}}
            {{{ Link className="register-page-link" href="/" text="Войти"}}}
          </div>
        </form>
      </div>
    `;
  }
}

export const RegistrationPage = () => {
  return RegistrationCmp;
};
