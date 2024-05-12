import { HTTPTransport } from "./HTTPTransport";
import { store } from "../store";
import { scrollToLast } from "./scrollToLast.ts";

class WS {
  private socket: WebSocket | undefined;

  private host = "ya-praktikum.tech";

  private chatId?: number;

  private userId?: number;

  private timerId?: NodeJS.Timeout;

  private isConnectionOK: boolean = false;

  private onOpenConnection() {
    this.isConnectionOK = true;
    console.log("Соединение установлено");

    this.getLastMessages();

    /*
     Функция для поддержания соединения по Websocket
     */
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        if (!this.socket) return;
        this.socket.send(
          JSON.stringify({
            type: "ping",
          })
        );
      }, 5000);
    }
  }

  private onCloseConnection(event: CloseEvent) {
    console.log(
      event.wasClean ? "Соединение закрыто чисто" : "Обрыв соединения"
    );
    this.isConnectionOK = false;

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  private onReceiveMessage(event: MessageEvent) {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      console.error(error);

      return;
    }
    if (Array.isArray(data)) {
      store.set("messageList", data.reverse());
    } else if (data.type === "message") {
      store.set("messageList", [...(store.getState().messageList || []), data]);
    }
  }

  private onError(event: Event) {
    const errEvent = event as ErrorEvent;
    console.log("Ошибка", errEvent.message);
  }

  sendMessage(message: string) {
    if (this.isConnectionOK && this.socket) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: "message",
        })
      );
    }
    scrollToLast();
  }

  private getLastMessages() {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    }
  }

  connect() {
    const chatId = store.getState()?.currentChatId;
    const userId = store.getState()?.currentUser?.id;

    if (!chatId || !userId) {
      throw new Error("Неверный chatId или userId!");
    }

    if (+chatId === this.chatId && userId === this.userId) {
      return;
    }

    const http = new HTTPTransport({ endpoint: `/chats/token/${chatId}` });
    http
      .post<{ token: string }>("")
      .then((data) => {
        if (this.chatId !== undefined && this.socket) {
          this.socket.removeEventListener(
            "open",
            this.onOpenConnection.bind(this)
          );
          this.socket.removeEventListener(
            "close",
            this.onCloseConnection.bind(this)
          );
          this.socket.removeEventListener(
            "message",
            this.onReceiveMessage.bind(this)
          );
          this.socket.removeEventListener("error", this.onError.bind(this));
          this.socket.close(
            1000,
            `Close previous chat connection with chat ${this.chatId}`
          );
        }

        this.socket = new WebSocket(
          `wss://${this.host}/ws/chats/${userId}/${chatId}/${data.token}`
        );

        this.socket.addEventListener("open", this.onOpenConnection.bind(this));
        this.socket.addEventListener(
          "close",
          this.onCloseConnection.bind(this)
        );
        this.socket.addEventListener(
          "message",
          this.onReceiveMessage.bind(this)
        );
        this.socket.addEventListener("error", this.onError.bind(this));
        this.chatId = +chatId;
        this.userId = userId;
      })
      .catch((error) => console.log("Ошибка установки соединения", error));
  }
}

export const websocket = new WS();
