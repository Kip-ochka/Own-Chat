import { BackButton } from "./back-button";
import { Button } from "./button";
import { ChatItem } from "./chat-item";
import { DropdownAddMedia } from "./dropdown-add-media";
import { DropdownChatOptions } from "./dropdown-chat-options";
import { Error } from "./error";
import { Input } from "./input";
import { InputSearch } from "./input-search";
import { InputSetting } from "./input-setting";
import { MessageDate } from "./message-date";
import { MessageMedia } from "./message-media";
import { MessageText } from "./message-text";
import { ModalAddUser } from "./modal-add-user";
import { ModalChangeAvatar } from "./modal-change-avatar";
import { ModalDeleteUser } from "./modal-delete-user";
import { ModalOverlay } from "./modal-overlay";
import { Navigate } from "./navigate";
import { registerComponent } from "../utils/registerComponent.ts";
import { InputElement } from "./Input-element";

registerComponent("BackButton", BackButton);
registerComponent("Button", Button);
registerComponent("ChatItem", ChatItem);
registerComponent("DropdownAddMedia", DropdownAddMedia);
registerComponent("DropdownChatOptions", DropdownChatOptions);
registerComponent("Error", Error);
registerComponent("Input", Input);
registerComponent("InputSearch", InputSearch);
registerComponent("InputSetting", InputSetting);
registerComponent("MessageDate", MessageDate);
registerComponent("MessageText", MessageText);
registerComponent("MessageMedia", MessageMedia);
registerComponent("ModalAddUser", ModalAddUser);
registerComponent("ModalChangeAvatar", ModalChangeAvatar);
registerComponent("ModalDeleteUser", ModalDeleteUser);
registerComponent("ModalOverlay", ModalOverlay);
registerComponent("InputElement", InputElement);
registerComponent("Navigate", Navigate);

export {
  BackButton,
  Button,
  ChatItem,
  DropdownChatOptions,
  DropdownAddMedia,
  Error,
  Input,
  InputSearch,
  InputSetting,
  MessageDate,
  MessageMedia,
  MessageText,
  ModalDeleteUser,
  ModalAddUser,
  ModalChangeAvatar,
  ModalOverlay,
  Navigate,
};
