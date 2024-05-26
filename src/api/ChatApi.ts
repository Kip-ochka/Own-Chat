import { UserData } from "./UserApi";
import { HTTPTransport } from "../utils/HTTPTransport.ts";

export type User = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export class ChatApi {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport({ endpoint: "/chats" });
  }

  getChatUsers(chatId: string): Promise<UserData[]> {
    return this.http.get(`/${chatId}/users`);
  }

  addUserToChat(chatId: number, userId: number): Promise<string> {
    return this.http.put("/users", { data: { users: [userId], chatId } });
  }

  removeUserFromChat(chatId: number, userId: number): Promise<string> {
    return this.http.delete("/users", { data: { users: [userId], chatId } });
  }

  create(chatTitle: string): Promise<string> {
    return this.http.post("", { data: { title: chatTitle } });
  }

  read(): Promise<User[]> {
    return this.http.get("");
  }

  delete(chatId: string): Promise<{
    id: number;
    title: string;
    avatar: string | null;
    created_by: number;
  }> {
    return this.http.delete("", { data: { chatId } });
  }
}
