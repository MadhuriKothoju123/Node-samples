window.showAlert = function (type, message, autoClose = true) {
  console.log("Hello alert");

  const alert = document.createElement("div");
  alert.classList.add("alert"); // Common alert class

  switch (type) {
    case "error":
      alert.classList.add("alert-danger");
      break;
    case "success":
      alert.classList.add("alert-success");
      break;
    case "info":
      alert.classList.add("alert-info");
      break;
    default:
      alert.classList.add("alert-primary");
  }

  alert.textContent = message;
  document.body.appendChild(alert);

  if (autoClose) {
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
};
