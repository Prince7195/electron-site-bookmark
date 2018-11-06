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
  let itemHTML = `<a class="panel-block read-item" data-url=${item.url}>
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
    .on("dblclick", this.openItem);
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
exports.openItem = function() {
  // Only item have been added
  if (!this.toreadItems.length) return;

  // get selected item
  let targetItem = $(".read-item.is-active");

  // get item's url
  let contentUrl = targetItem.data("url");

  console.log("Opening item");
  console.log(contentUrl);
};
