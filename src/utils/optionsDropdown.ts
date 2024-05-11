export const optionsDropdownToggle = (event: Event) => {
  const dropdown = document.getElementById("options_dropdown");
  const overlay = document.getElementById("dropdown_chat_options");
  if (!dropdown || !overlay) return;
  if (
    event.currentTarget instanceof HTMLButtonElement &&
    event.currentTarget.classList.contains("chats__options-button")
  ) {
    const { top, left, height } = event.currentTarget.getBoundingClientRect();
    dropdown.style.top = `${top + height}px`;
    dropdown.style.left = `${left - 200}px`;
  }
  dropdown.classList.toggle("dropdown_close");
  overlay.classList.toggle("dropdown-overlay_close");
};
