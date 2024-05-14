import { Block } from "../../utils/Block.ts";
import { openChangeAvatar } from "../../utils/modalAvatar.ts";

export type AvatarButtonBlock = {
  events: {
    click: (event: Event) => void;
  };
};

class AvatarButtonCmp extends Block<AvatarButtonBlock> {
  constructor() {
    super({
      events: {
        click: () => {
          openChangeAvatar();
        },
      },
    });
  }

  protected render() {
    //language=hbs
    return `<div class="profile-img-overlay">
              Поменять аватар
    </div>`;
  }
}

export const AvatarButton = () => {
  return new AvatarButtonCmp();
};
