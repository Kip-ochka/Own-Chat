export const openCreateChat = () => {
  const modal = document.getElementById("modal_create_chat");
  if (!modal) return;
  modal.classList.remove("modal__close");
};

export const closeCreateChat = () => {
  const modal = document.getElementById("modal_create_chat");
  if (!modal) return;
  modal.classList.add("modal__close");
};
