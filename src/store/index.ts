import { set } from "../utils/helpers/set";
import { EventBus } from "../utils/EventBus.ts";
import { Block } from "../utils/Block.ts";
import { isEqual } from "../utils/helpers/isEqual.ts";

type Indexed<T = unknown> = {
  [key in string]: T;
};

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export type Message = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type LastMessage = {
  time: string;
  content: string;
  user: User;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message?: LastMessage;
};

export type RootStore = {
  currentUser?: User;
  chatList?: Chat[];
  messageList?: Message[];
  currentChatId?: string;
  searchValue?: string;
};

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private state: Indexed = {};

  public getState = (): RootStore => {
    return this.state;
  };

  public set = (path: keyof RootStore, value: unknown) => {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  };

  public clear = () => {
    this.set("currentUser", {});
    this.set("chatList", []);
    this.set("currentChatId", "");
    this.set("searchValue", "");
    this.set("messageList", []);
  };
}

export const store = new Store();

export const withStore = (mapStateToProps: (state: RootStore) => Indexed) => {
  return <T extends object>(Component: typeof Block<T>): typeof Block<T> => {
    return class extends Component {
      constructor(props: T) {
        let state = mapStateToProps(store.getState() as RootStore);

        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState() as RootStore);
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
};
