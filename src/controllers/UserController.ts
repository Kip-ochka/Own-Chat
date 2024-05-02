import { UserApi, UserData, ChangePasswordData } from "../api/UserApi";

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

  async changeAvatar(data: FormData) {
    const userData = await this.api.changeAvatarData(data);
    console.log(userData);
  }
}

export default new UserController();
