import { HTTPTransport } from "../utils/HTTPTransport.ts";

export type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export interface SignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignInData {
  login: string;
  password: string;
}

export class AuthApi {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport({ endpoint: "/auth" });
  }

  signUp(data: SignUpData): Promise<string> {
    return this.http.post("/signup", { data });
  }

  signIn(data: SignInData): Promise<string> {
    return this.http.post("/signin", { data });
  }

  logout(): Promise<string> {
    return this.http.post("/logout");
  }

  read(): Promise<UserData> {
    return this.http.get("/user");
  }
}
