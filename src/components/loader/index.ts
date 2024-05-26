import { Block } from "../../utils/Block.ts";
import "./loader.scss";

class LoaderCmp extends Block {
  constructor() {
    super();
  }

  protected render() {
    return `<div class="wrapper"><span class="loader"></span></div>`;
  }
}

export const Loader = () => {
  return new LoaderCmp();
};
