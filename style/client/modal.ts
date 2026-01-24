document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event?.preventDefault();
    const modalId = button.getAttribute("data-modal") ?? "";
    const modal = document.getElementById(modalId);
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
      const input = modal.querySelector<HTMLInputElement>("input");
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialogId = button.getAttribute("data-close") ?? "";
    const dialog = document.getElementById(dialogId);
    if (dialog instanceof HTMLDialogElement) {
      dialog.close();
    }
  });
});
