import { Block } from "../utils/Block.ts";
import { Error } from "../components";

class NotFoundCmp extends Block {
  constructor() {
    super({
      error: Error({ errorCode: "404", message: "Не туда попали" }),
    });
  }

  protected render(): string {
    //language=hbs
    return `<div style="height: 100%">{{{ error }}}</div>`;
  }
}

export const NotFoundPage = () => {
  return NotFoundCmp;
};
