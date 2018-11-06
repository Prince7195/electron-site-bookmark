const { ipcRenderer } = require("electron");
const items = require("./items");
const menu = require("./menu");

// Navigate selected item with up and down
$(document).keydown(function(e) {
  switch (e.key) {
    case "ArrowUp":
      items.changeItem("up");
      break;
    case "ArrowDown":
      items.changeItem("down");
      break;
  }
});

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
    // Disable modal UI
    $("#item-input").prop("disable", true);
    $("#add-button").addClass("is-loading");
    $(".close-add-modal").addClass("is-disabled");

    // Send URL to main process via IPC
    ipcRenderer.send("new-item", newItemURL);
  }
});

// Listen to new item from main
ipcRenderer.on("new-item-success", function(e, item) {
  // Add item to items array
  items.toreadItems.push(item);

  // Save item
  items.saveItems();

  // Add item
  items.addItem(item);

  // Close and Reset modal
  $("#add-modal").removeClass("is-active");
  $("#item-input")
    .prop("disabled", false)
    .val("");
  $("#add-button").removeClass("is-loading");
  $(".close-add-modal").removeClass("is-disabled");

  // If first item being added, selec it
  if (items.toreadItems.length === 1) {
    $(".read-item:first()").addClass("is-active");
  }
});

// Simulate Add Click on enter
$("#item-input").keyup(function(e) {
  if (e.key === "Enter") $("#add-button").click();
});

// Filter items by title
$("#search").keyup(function(e) {
  // Get current search input value
  let filter = $(e.currentTarget).val();

  $(".read-item").each(function(i, el) {
    $(el)
      .text()
      .toLowerCase()
      .includes(filter.toLowerCase())
      ? $(el).show()
      : $(el).hide();
  });
});

// Add items when app loads
if (items.toreadItems.length) {
  items.toreadItems.forEach(items.addItem);
  $(".read-item:first()").addClass("is-active");
}
