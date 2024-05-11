import { Block } from "../../utils/Block.ts";
import "./dropdown-overlay.scss";
export type DropdownOverlayProps = {
  events?: {
    click?: (event: MouseEvent) => void;
  };
};

class DropdownOverlayCmp extends Block<DropdownOverlayProps> {
  constructor(props: DropdownOverlayProps) {
    super(props);
  }

  protected render(): string {
    return `<div class="dropdown-overlay dropdown-overlay_close" id="dropdown_chat_options"></div>`;
  }
}

export const DropdownOverlay = (props: DropdownOverlayProps) => {
  return new DropdownOverlayCmp(props);
};
