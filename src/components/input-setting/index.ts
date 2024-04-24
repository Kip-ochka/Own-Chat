import { Block } from "../../utils/Block.ts";
import "./input-setting.scss";
import { InputElement, InputElementProps } from "../Input-element";

export interface InputSettingProps extends InputElementProps {
  id: string;
  label: string;
  errorText?: string;
}

export type InputSettingBlock = {
  inputElement: Block<InputElementProps>;
} & InputSettingProps;

class InputSettingCmp extends Block<InputSettingBlock> {
  constructor(props: InputSettingProps) {
    super({
      ...props,
      inputElement: InputElement({ ...props, className: "input-setting" }),
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="setting-wrapper">
          <label for="{{id}}" class="label-setting">{{label}}</label>
          {{{ inputElement }}}
          <span class="setting-error">{{errorText}}</span>
        </div>
    `;
  }
}

export const InputSetting = (props: InputSettingProps) => {
  return new InputSettingCmp(props);
};
