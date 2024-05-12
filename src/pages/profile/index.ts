import { Block } from "../../utils/Block.ts";
import "./profile.scss";
import { store, withStore } from "../../store";
import { AvatarButton, Button } from "../../components";
import { ButtonProps } from "../../components/button";
import AuthController from "../../controllers/AuthController.ts";
import { Router } from "../../utils/Router.ts";
import { AvatarButtonBlock } from "../../components/avatar-button";

type ProfileData = {
  id?: string;
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
  avatar?: string;
};

export type ProfileBlock = {
  exit: Block<ButtonProps>;
  avatarButton: Block<AvatarButtonBlock>;
} & ProfileData;

class ProfilePageCmp extends Block<ProfileBlock> {
  constructor(props: ProfileData) {
    super({
      ...props,
      avatarButton: AvatarButton(),
      exit: Button({
        type: "button",
        text: "Выйти",
        className: "profile__sign-out-btn",
        events: {
          click: () => {
            AuthController.logout()
              .then(() => {
                store.clear();
                const router = new Router();
                router.go("/");
              })
              .catch((error) =>
                alert(
                  `Ошибка выполнения запроса /logout! ${error ? error.reason : ""}`
                )
              );
          },
        },
      }),
    });
  }

  componentDidMount() {
    AuthController.getUser().catch(() => new Router().go("/"));
  }

  protected render(): string {
    const {
      email,
      display_name,
      second_name,
      first_name,
      login,
      phone,
      avatar,
    } = this.props;
    if (!this.props || !this.props.id) {
      return `<div class="wrapper"><span class="loader"></span></div>`;
    }

    //language=hbs
    return `
      <div class="profile__wrapper">
        {{{ ModalChangeAvatar }}}
        {{{ BackButton href='/messenger' }}}
        <div class="profile">
          <div class="profile__img-wrapper">
            <div class="profile__img-overlay-wrapper">
              ${avatar ? `<img src=${"https://ya-praktikum.tech/api/v2/resources" + avatar} alt="Автара" class="profile__img"/>` : '<div class="profile__img"></div>'}
              {{{ avatarButton }}}
            </div>
            <span class="profile__name">${first_name}</span>
          </div>
          <ul class="profile__fields">
            <li class="profile__field">
              <span class="profile__field__label">Почта</span>
              <span class="profile__field__value">${email || ""}</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Логин</span>
              <span class="profile__field__value">${login || ""}</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Имя</span>
              <span class="profile__field__value">${first_name || ""}</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Фамилия</span>
              <span class="profile__field__value">${second_name || ""}</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Имя в чате</span>
              <span class="profile__field__value">${display_name || ""}</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Телефон</span>
              <span class="profile__field__value">${phone || ""}</span>
            </li>
          </ul>
          <div class="profile__links-wrapper">
            {{{ Link className="profile__link" href="/settings-edit" text="Изменить данные"}}}
            {{{ Link className="profile__link" href="/password-edit" text="Изменить пароль"}}}
            {{{exit}}}
          </div>
        </div>
      </div>
    `;
  }
}

export const ProfilePage = () => {
  const withUser = withStore((state) => ({ ...state.currentUser }));

  return withUser<ProfileData>(ProfilePageCmp);
};
