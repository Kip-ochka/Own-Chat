import { UserApi, UserData, ChangePasswordData } from "../api/UserApi";
import { store } from "../store";

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async updateProfile(profile: UserData) {
    await this.api.update(profile);
  }

  async changePassword(data: ChangePasswordData) {
    await this.api.changePassword(data);
  }

  async getUserByLogin(login: string) {
    return this.api.getUserByLogin(login);
  }

  async changeAvatar(file: File) {
    const FD = new FormData();
    FD.append("avatar", file);
    const userData = await this.api.changeAvatarData(FD);
    store.set("currentUser", userData);
  }
}

export default new UserController();
