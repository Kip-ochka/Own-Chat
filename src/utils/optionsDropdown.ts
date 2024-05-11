export const optionsDropdownToggle = () => {
  const dropdown = document.getElementById("options_dropdown");
  const overlay = document.getElementById("dropdown_chat_options");
  if (!dropdown || !overlay) return;
  dropdown.classList.toggle("dropdown_close");
  overlay.classList.toggle("dropdown-overlay_close");
};
