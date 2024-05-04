import { Block } from "../../utils/Block.ts";

export type InputElementProps = {
  id: string;
  placeholder?: string;
  type?: string;
  className?: string;
  inputValue?: string;

  events?: {
    blur?: (event: Event) => void;
    change?: (event: Event) => void;
    focus?: (event: Event) => void;
  };
};

class InputElementCmp extends Block<InputElementProps> {
  constructor(props: InputElementProps) {
    super(props);
  }

  protected render(): string {
    const {
      placeholder = "",
      id,
      type = "text",
      className = "",
      inputValue = "",
    } = this.props;

    return `
      <input
        class="${className}"
        placeholder="${placeholder}"
        name="${id}"
        id="${id}"
        autocomplete="false"
        value="${inputValue}"
        type="${type}"
      >
`;
  }
}

export const InputElement = (props: InputElementProps) => {
  return new InputElementCmp(props);
};
