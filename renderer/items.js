// Track items with array
exports.toreadItems = JSON.parse(localStorage.getItem("toreadItems")) || [];

// Save items to localstorage
exports.saveItems = function() {
  localStorage.setItem("toreadItems", JSON.stringify(this.toreadItems));
};

exports.selectItem = function(e) {
  $(".read-item").removeClass("is-active");
  $(e.currentTarget).addClass("is-active");
};

// Add new Item
exports.addItem = function(item) {
  // Hide no items message
  $("#no-items").hide();

  // New item html
  let itemHTML = `<a class="panel-block read-item" data-url="${
    item.url
  }" data-title="${item.title}">
                    <figure class="image has-shadow is-64x64 thumb">
                      <img src="${item.screenshot}">
                    </figure>
                    <h2 class="title is-4 column">${item.title}</h2>
                  </a>`;

  // Append to read-list container
  $("#read-list").append(itemHTML);

  // Attach select event handler
  $(".read-item")
    .off("click, dblclick")
    .on("click", this.selectItem)
    .on("dblclick", window.openItem);
};

// Select next/prev item
exports.changeItem = function(direction) {
  // get current active item
  let activeItem = $(".read-item.is-active");

  // check direction and get next or previous read-item
  let newItem =
    direction === "down"
      ? activeItem.next(".read-item")
      : activeItem.prev(".read-item");

  // only if the item exist, make selection change
  if (newItem.length) {
    activeItem.removeClass("is-active");
    newItem.addClass("is-active");
  }
};

// Open item for reading
window.openItem = function() {
  toreadItems = JSON.parse(localStorage.getItem("toreadItems")) || [];
  // Only item have been added
  if (this.toreadItems && this.toreadItems.length === 0) return;

  // get selected item
  let targetItem = $(".read-item.is-active");

  // get item's url
  let contentUrl = encodeURIComponent(targetItem.data("url"));

  // get item index to pass to proxy window
  let itemIndex = targetItem.index() - 1;

  // Reader window URL
  let readerWinURL = `file://${__dirname}/reader.html?url=${contentUrl}&itemIndex=${itemIndex}`;

  // Open item in new proxy BrowserWindow
  let readerWin = window.open(readerWinURL, targetItem.data("title"));
};

// Window function
// Delete item by index
window.deleteItem = function(index = false) {
  // Set index to active item if not passed as argument
  if (index === false) {
    // get current active item
    let activeItem = $(".read-item.is-active");
    index = activeItem.index() - 1;
  }

  // Remove item from DOM
  $(".read-item")
    .eq(index)
    .remove();

  // Remove from toreadItems array
  this.toreadItems = this.toreadItems.filter((item, i) => i !== index);

  // Update storage
  localStorage.setItem("toreadItems", JSON.stringify(this.toreadItems));

  // select prev or none if list empty
  if (this.toreadItems && this.toreadItems.length > 0) {
    // If first item was deleted, select new first itemin list, else prev item
    let newIndex = index === 0 ? 0 : index - 1;

    // Assign active class to new index
    $(".read-item")
      .eq(newIndex)
      .addClass("is-active");
  } else {
    $("#no-items").show();
  }
};

// Open item in default Browser
window.openInBrowser = function() {
  toreadItems = JSON.parse(localStorage.getItem("toreadItems")) || [];
  // Only item have been added
  if (this.toreadItems && this.toreadItems.length === 0) return;

  // get selected item
  let targetItem = $(".read-item.is-active");

  // Open in Browser
  require("electron").shell.openExternal(targetItem.data("url"));
};
