export const openChangeAvatar = () => {
  const modal = document.getElementById("modal_avatar");
  if (!modal) return;
  modal.classList.remove("modal__close");
};

export const closeModalAvatar = () => {
  const modal = document.getElementById("modal_avatar");
  if (!modal) return;
  modal.classList.add("modal__close");
};
