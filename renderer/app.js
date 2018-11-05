const { ipcRenderer } = require("electron");

// Show modal
$(".open-add-modal").click(function() {
  $("#add-modal").addClass("is-active");
});

// Hide modal
$(".close-add-modal").click(function() {
  $("#add-modal").removeClass("is-active");
});

// Handle add-modal submission
$("#add-button").click(function() {
  // Get URL from input
  var newItemURL = $("#item-input").val();
  if (newItemURL) {
    // Send URL to main process via IPC
    ipcRenderer.send("new-item", newItemURL);
    $("#item-input").val("");
  }
});

// Simulate Add Click on enter
$("#item-input").keyup(function(e) {
  if (e.key === "Enter") $("#add-button").click();
});
