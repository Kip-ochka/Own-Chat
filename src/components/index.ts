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
import { AvatarButton } from "./avatar-button";
import { ButtonSendMessage } from "./button-send-message";
import { ModalCreateChat } from "./modal-create-chat";
import { ButtonOpenChatOptions } from "./button-open-chat-options";
import { DropdownOverlay } from "./dropdown-overlay";
import { ButtonChatOption } from "./button-chat-option";
import { ModalDeleteChat } from "./modal-delete-chat";
import { Loader } from "./loader";
import { Link } from "./link";

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
registerComponent("AvatarButton", AvatarButton);
registerComponent("ButtonSendMessage", ButtonSendMessage);
registerComponent("ModalCreateChat", ModalCreateChat);
registerComponent("ButtonOpenChatOptions", ButtonOpenChatOptions);
registerComponent("DropdownOverlay", DropdownOverlay);
registerComponent("ButtonChatOption", ButtonChatOption);
registerComponent("ModalDeleteChat", ModalDeleteChat);
registerComponent("Loader", Loader);
registerComponent("Link", Link);

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
  AvatarButton,
  ButtonSendMessage,
  ModalCreateChat,
  ButtonOpenChatOptions,
  DropdownOverlay,
  ButtonChatOption,
  ModalDeleteChat,
  Loader,
  Link,
};
