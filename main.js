// Modules to control application life and create native browser window
const { app, ipcMain } = require("electron");
const mainWindow = require("./mainWindow");
const readItem = require("./readItem");

const env = "Prod";
if (env === "Dev") {
  require("electron-reload")(__dirname);
}

ipcMain.on("new-item", function(e, itemURL) {
  // Get read item with readItem module
  readItem(itemURL, function(item) {
    // send to renderer
    e.sender.send("new-item-success", item);
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", mainWindow.createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    mainWindow.createWindow();
  }
});
