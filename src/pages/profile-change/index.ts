import { Block } from "../../utils/Block.ts";
import "./profile-change.scss";

import { REGEXPS, validateInputs } from "../../utils/validators.ts";
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

export type ProfileChangeBlock = {
  button: Block<ButtonProps>;
} & ProfileData;

class ProfileChangeCmp extends Block<ProfileChangeBlock> {
  constructor(props: ProfileChangeBlock) {
    const className = "input-setting_error";
    super({
      ...props,
      button: Button({
        text: "Сохранить",
        type: "submit",
        events: {
          click: (event) => this.saveProfile(event, className, this.props.id),
        },
      }),
    });
  }

  componentDidMount = () => {
    AuthController.getUser().catch(() => new Router().go("/"));
  };

  saveProfile = (
    event: MouseEvent,
    className: string,
    id: number | undefined
  ) => {
    try {
      event.preventDefault();
      const { result, data } = validateInputs(
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
      if (result && id) {
        const { email, display_name, second_name, first_name, login, phone } =
          data;
        UserController.updateProfile({
          id,
          email,
          display_name,
          second_name,
          first_name,
          login,
          phone,
        })
          .then(() => alert("Профиль успешно обновлен!"))
          .catch((error) =>
            alert(
              `Ошибка выполнения запроса обновления профиля! ${error ? error.reason : ""}`
            )
          );
      }
    } catch (e) {
      alert(`Ошибка выполнения запроса обновления профиля!`);
    }
  };

  protected render(): string {
    //language=hbs
    const { avatar } = this.props;
    if (!this.props || !this.props.id) {
      return `<div class="wrapper"><span class="loader"></span></div>`;
    }

    return `
      <div class="profile-change__wrapper">
        {{{ BackButton href='/messenger' }}}
        <form class="profile-change">
          <div class="profile-change__img-wrapper">
            ${avatar ? `<img src=${"https://ya-praktikum.tech/api/v2/resources" + avatar} alt="Автара" class="profile__img"/>` : '<div class="profile__img"></div>'}
          </div>
          <ul class="profile-change__fields">
            <li class="profile-change__field">
              {{{ InputSetting
                id="email"
                label="Почта"
                placeholder="Почта"
                inputValue="${this.props.email || ""}"
                errorText="Введите корректную почту"
                regexp="${REGEXPS.EMAIL}"
              }}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting
                id="login"
                label="Логин"
                placeholder="Логин"
                inputValue="${this.props.login || ""}"
                errorText="Введите корректный логин"
                regexp="${REGEXPS.LOGIN}"
              }}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting
                id="first_name"
                label="Имя"
                placeholder="Имя"
                inputValue="${this.props.first_name || ""}"
                errorText="Введите корректное имя"
                regexp="${REGEXPS.NAME}"
              }}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting
                id="second_name"
                label="Фамилия"
                placeholder="Фамилия"
                inputValue="${this.props.second_name || ""}"
                errorText="Введите корректную фамилию"
                regexp="${REGEXPS.NAME}"
              }}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting
                id="display_name"
                label="Имя в чате"
                placeholder="Имя в чате"
                inputValue="${this.props.display_name || ""}"
                errorText="Введите корректный никнейм"
                regexp="${REGEXPS.NICKNAME}"
              }}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting
                id="phone"
                label="Имя в чате"
                placeholder="Имя в чате"
                inputValue="${this.props.phone || ""}"
                errorText="Введите корректный номер телефона"
                regexp="${REGEXPS.PHONE}"
              }}}
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
  const withUser = withStore((state) => ({ ...state.currentUser }));
  return withUser(ProfileChangeCmp);
};
