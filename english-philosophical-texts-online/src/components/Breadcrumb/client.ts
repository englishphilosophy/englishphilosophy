document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event?.preventDefault();
    const modalId = button.getAttribute("data-modal") ?? "";
    const modal = document.getElementById(modalId);
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  });
});
