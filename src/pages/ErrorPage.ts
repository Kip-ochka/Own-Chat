import { Block } from "../utils/Block.ts";
import { Error } from "../components";

class ErrorCmp extends Block<{}> {
  constructor() {
    super({
      error: Error({ errorCode: "500", message: "Мы уже фиксим" }),
    });
  }

  protected render(): string {
    //language=hbs
    return `<div style="height: 100%">{{{ error }}}</div>`;
  }
}

export const ErrorPage = () => {
  return ErrorCmp;
};
