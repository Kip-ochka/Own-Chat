export const openAddUser = () => {
  const modal = document.getElementById("modal_add_user");
  if (!modal) return;
  modal.classList.remove("modal__close");
};

export const closeAddUser = () => {
  const modal = document.getElementById("modal_add_user");
  if (!modal) return;
  modal.classList.add("modal__close");
};
