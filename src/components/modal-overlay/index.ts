import { Block } from "../../utils/Block.ts";
import "./modal-overlay.scss";

class ModalOverlayCmp extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    return `<div class="modal-overlay"></div>`;
  }
}

export const ModalOverlay = () => {
  return new ModalOverlayCmp();
};
