// Module
const { remote, shell } = require("electron");

// Menu Template Object
const template = [
  {
    label: "Items",
    submenu: [
      {
        label: "Add Item",
        accelerator: "CmdOrCtrl+O",
        click() {
          $(".open-add-modal").click();
        }
      },
      {
        label: "Read Item",
        accelerator: "CmdOrCtrl+Enter",
        click() {
          window.openItem();
        }
      },
      {
        label: "Delete Item",
        accelerator: "CmdOrCtrl+Backspace",
        click() {
          window.deleteItem();
        }
      },
      {
        label: "Open in Browser",
        accelerator: "CmdOrCtrl+Shift+Enter",
        click() {
          window.openInBrowser();
        }
      }
    ]
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteandmatchstyle" },
      { role: "delete" },
      { role: "selectall" }
    ]
  },
  {
    role: "window",
    submenu: [{ role: "minimize" }, { role: "close" }]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click() {
          shell.openExternal("https://electronjs.org");
        }
      }
    ]
  }
];

// Add menu to app
const menu = remote.Menu.buildFromTemplate(template);
remote.Menu.setApplicationMenu(menu);
