export const openDeleteUser = () => {
  const modal = document.getElementById("modal_delete_user");
  if (!modal) return;
  modal.classList.remove("modal__close");
};

export const closeDeleteUser = () => {
  const modal = document.getElementById("modal_delete_user");
  if (!modal) return;
  modal.classList.add("modal__close");
};
