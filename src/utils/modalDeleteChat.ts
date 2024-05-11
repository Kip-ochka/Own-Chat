export const openDeleteChat = () => {
  const modal = document.getElementById("modal_delete_chat");
  if (!modal) return;
  modal.classList.remove("modal__close");
};

export const closeDeleteChat = () => {
  const modal = document.getElementById("modal_delete_chat");
  if (!modal) return;
  modal.classList.add("modal__close");
};
