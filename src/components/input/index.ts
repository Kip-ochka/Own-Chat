import { Block } from "../../utils/Block.ts";
import "./input.scss";
import { InputElement, InputElementProps } from "../Input-element";

export interface InputProps extends InputElementProps {
  label: string;
  errorText?: string;
}

export type InputBlock = {
  inputElement: Block<InputElementProps>;
} & InputProps;

class InputCmp extends Block<InputBlock> {
  constructor(props: InputProps) {
    super({
      ...props,
      inputElement: InputElement({
        ...props,
        className: "input__native-element",
      }),
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <label class="input" for="{{id}}">
        <span class="input__label">{{label}}</span>
        {{{ inputElement }}}
        <span class="input__error">{{errorText}}</span>
      </label>
    `;
  }
}

export const Input = (props: InputProps) => {
  return new InputCmp(props);
};
