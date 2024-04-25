import { Block } from "../../utils/Block.ts";
import "./profile.scss";

class ProfilePageCmp extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    //language=hbs
    return `
      <div class="profile__wrapper">
        {{{ BackButton }}}
        <div class="profile">
          <div class="profile__img-wrapper">
            <div class="profile__img-overlay-wrapper">
              <div class="profile__img" ></div>
              <div class="profile__img-overlay">
                Поменять аватар
              </div>
            </div>
            <span class="profile__name">Иван</span>
          </div>
          <ul class="profile__fields">
            <li class="profile__field">
              <span class="profile__field__label">Почта</span>
              <span class="profile__field__value">email@email.ru</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Логин</span>
              <span class="profile__field__value">IVAN999</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Имя</span>
              <span class="profile__field__value">Иван</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Фамилия</span>
              <span class="profile__field__value">Иванов</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Имя в чате</span>
              <span class="profile__field__value">Иван</span>
            </li>
            <li class="profile__field">
              <span class="profile__field__label">Телефон</span>
              <span class="profile__field__value">+7 (999) 999 99 99</span>
            </li>
          </ul>
          <div class="profile__links-wrapper">
            <a href="/" class="profile__link">Изменить данные</a>
            <a href="/" class="profile__link">Изменить пароль</a>
            <button class="profile__sign-out-btn">Выйти</button>
          </div>
        </div>
      </div>
    `;
  }
}

export const ProfilePage = () => {
  return new ProfilePageCmp();
};
