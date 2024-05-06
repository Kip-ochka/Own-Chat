import { Block } from "../../utils/Block.ts";
import "./modal-overlay.scss";

export type ModalOverlayProps = {
  events?: {
    click?: (event: MouseEvent) => void;
  };
};

class ModalOverlayCmp extends Block<ModalOverlayProps> {
  constructor(props: ModalOverlayProps) {
    super(props);
  }

  protected render(): string {
    return `<div class="modal-overlay"></div>`;
  }
}

export const ModalOverlay = (props: ModalOverlayProps) => {
  return new ModalOverlayCmp(props);
};
