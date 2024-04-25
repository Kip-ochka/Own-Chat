import { Block } from "../../utils/Block.ts";
import "./input-search.scss";

export type InputSearchProps = {
  events?: {
    change?: (event: InputEvent) => void;
  };
};

class InputSearchCmp extends Block<InputSearchProps> {
  constructor(props: InputSearchProps) {
    super({
      ...props,
      events: {
        change: (event: InputEvent) => {
          if (event.target instanceof HTMLInputElement) {
            this.setProps({ value: event.target.value });
          }
          if (props.events?.change) {
            props.events?.change(event);
          }
        },
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `<input class="search-input" type="text" placeholder="Поиск">`;
  }
}

export const InputSearch = (props: InputSearchProps) => {
  return new InputSearchCmp(props);
};
