// Modules
const { BrowserWindow } = require("electron");

// Browserwindow
let bgItemWin;

//New read item method
module.exports = (url, callback) => {
  // create new offscreen Browserwindow.
  bgItemWin = new BrowserWindow({
    width: 1000,
    height: 1000,
    show: false,
    webPreferences: {
      offscreen: true
    }
  });

  // Load read item
  bgItemWin.loadURL(url);

  // wait for the page to finish loading
  bgItemWin.webContents.on("did-finish-load", function() {
    // Get screenshot Thumbnail
    bgItemWin.webContents.capturePage(function(image) {
      // Get image as dataURI
      let screenshot = image.toDataURL();

      // Get page title
      let title = bgItemWin.getTitle();

      // Return new item via callback
      callback({
        screenshot,
        title,
        url
      });

      // Clean Up
      bgItemWin.close();
      bgItemWin = null;
    });
  });
};
