import { Block } from "../../utils/Block.ts";
import "../dropdown/dropdown.scss";

export type DropdownAddMediaProps = {};

class DropdownAddMediaCmp extends Block<DropdownAddMediaProps> {
  constructor(props: DropdownAddMediaProps) {
    super(props);
  }

  protected render(): string {
    return `
      <ul class="dropdown dropdown_add-media">
        <li class="dropdown__item">
          <div class="dropdown__image dropdown__image_photo"></div>
          <span class="dropdown__text">Фото или Видео</span>
        </li>
        <li class="dropdown__item">
          <div class="dropdown__image dropdown__image_file"></div>
          <span class="dropdown__text">Файл</span>
        </li>
        <li class="dropdown__item">
          <div class="dropdown__image dropdown__image_location" ></div>
          <span class="dropdown__text">Локация</span>
        </li>
      </ul>
    `;
  }
}

export const DropdownAddMedia = () => {
  return new DropdownAddMediaCmp({});
};
