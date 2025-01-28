const loginDialog = document.querySelector("#loginDialog");
const loginBtn = document.querySelector(".loginBtn");
const messageDialog = document.querySelector("#messageDialog");
const createMessageBtn = document.querySelector(".createMessageBtn");

if (createMessageBtn && messageDialog) {
  createMessageBtn.addEventListener("click", () => openModal(messageDialog));
  messageDialog.addEventListener("click", (e) => closeModal(e, messageDialog));
}

if (loginBtn && loginDialog) {
  loginBtn.addEventListener("click", () => openModal(loginDialog));
  loginDialog.addEventListener("click", (e) => closeModal(e, loginDialog));
}

function openModal(dialog) {
  dialog.showModal();
}

function closeModal(e, dialog) {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
}
