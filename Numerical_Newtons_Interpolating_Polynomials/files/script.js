const settingsPopup = document.getElementById("settings-popup");
const closePopupButton = document.getElementById("close-popup");
const exitPopup = document.getElementById("exit-popup");
const confirmExitButton = document.getElementById("confirm-exit");
const cancelExitButton = document.getElementById("cancel-exit");

document.getElementById("start").addEventListener("click", function() {
  window.location.href = "test.html";
});

document.getElementById("settings").addEventListener("click", function() {
  settingsPopup.classList.remove("hidden");
});

closePopupButton.addEventListener("click", function() {
  settingsPopup.classList.add("hidden");
});

document.getElementById("exit").addEventListener("click", function() {
  exitPopup.classList.remove("hidden");
});

confirmExitButton.addEventListener("click", function() {
  window.close();
});

cancelExitButton.addEventListener("click", function() {
  exitPopup.classList.add("hidden");
});
