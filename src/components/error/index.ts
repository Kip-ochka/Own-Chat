import { Block } from "../../utils/Block.ts";
import "./error.scss";

export type ErrorProps = {
  errorCode: string;
  message: string;
};

class ErrorCmp extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super(props);
  }

  protected render(): string {
    //language=hbs
    return `
      <div class="error-page">
        <h1 class="error-page__title">{{errorCode}}</h1>
        <p class="error-page__message">{{message}}</p>
        <a href="/" class="error-page__link">Назад к чатам</a>
      </div>
    `;
  }
}

export const Error = (props: ErrorProps) => {
  return new ErrorCmp(props);
};
