import { AuthApi, SignInData, SignUpData } from "../api/AuthApi.ts";
import { store } from "../store";

class AuthController {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signUp(data: SignUpData) {
    await this.api.signUp(data);
  }

  async signIn(data: SignInData) {
    await this.api.signIn(data);
  }

  async logout() {
    await this.api.logout();
  }

  async getUser() {
    const userData = await this.api.read();
    store.set("currentUser", userData);
    return userData;
  }
}

export default new AuthController();
