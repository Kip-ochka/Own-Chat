import { Block } from "../../utils/Block.ts";
import "./navigate.scss";

class NavigateCmp extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    return `
      <nav>
        <ul class="nav-links">
            <li><a page="ChatPage">Чат</a></li>
            <li><a page="ErrorPage">500</a></li>
            <li><a page="LoginPage">Логин</a></li>
            <li><a page="ProfileChangePage">Изменить профиль</a></li>
            <li><a page="ProfilePage">Профиль</a></li>
            <li><a page="ProfilePasswordPage">Изменить пароль</a></li>
            <li><a page="RegistrationPage">Регистрация</a></li>
          </ul>
        </nav>
    `;
  }
}

export const Navigate = () => {
  return new NavigateCmp();
};
