import { HTTPTransport } from "../utils/HTTPTransport.ts";

export type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export class UserApi {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport({ endpoint: "/user" });
  }

  update(data: UserData): Promise<string> {
    return this.http.put("/profile", { data });
  }

  getUserByLogin(login: string): Promise<UserData[]> {
    return this.http.post("/search", { data: { login } });
  }

  changePassword(data: ChangePasswordData): Promise<string> {
    return this.http.put("/password", { data });
  }

  changeAvatarData(data: FormData): Promise<string> {
    return this.http.put("/profile/avatar", { data });
  }
}
