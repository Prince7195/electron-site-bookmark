const { BrowserWindow } = require("electron");
const devtron = require("devtron");

const env = "Dev";

// BrowserWindow Inastance
exports.win;

// Browserwindow Createwindow Function
exports.createWindow = function() {
  this.win = new BrowserWindow({
    width: 500,
    height: 650,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 310
  });

  // DevTools
  if (env === "Dev") {
    this.win.webContents.openDevTools();
    devtron.install();
  }

  this.win.loadURL(`file://${__dirname}/renderer/main.html`);

  // Handle windows close event
  this.win.on("closed", function() {
    this.win = null;
  });
};
