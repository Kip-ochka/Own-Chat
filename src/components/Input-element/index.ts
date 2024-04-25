import { Block } from "../../utils/Block.ts";

export type InputElementProps = {
  id: string;
  placeholder?: string;
  value?: string;
  type?: string;
  className?: string;

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
      value = "",
      className = "",
    } = this.props;
    return `
      <input
        class="${className}"
        placeholder="${placeholder}"
        name="${id}"
        id="${id}"
        autocomplete="false"
        value="${value}"
        type="${type}"
      >
`;
  }
}

export const InputElement = (props: InputElementProps) => {
  return new InputElementCmp(props);
};
