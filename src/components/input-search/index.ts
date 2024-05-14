import { Block } from "../../utils/Block.ts";
import "./input-search.scss";

export type InputSearchBlock = {
  events: {
    input: (event: Event) => void;
  };
};

class InputSearchCmp extends Block<InputSearchBlock> {
  constructor(props: InputSearchBlock) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `<input id='search-chat' class="search-input" type="text" placeholder="Поиск">`;
  }
}

export const InputSearch = (props: InputSearchBlock) => {
  return new InputSearchCmp(props);
};
