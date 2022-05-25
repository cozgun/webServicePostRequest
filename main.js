    "use strict";
    const electron = require('electron')
    const fs = require('fs')
    const app = electron.app
    const BrowserWindow = electron.BrowserWindow
    const ipc = electron.ipcMain
    const path = require('path')
    const url = require('url')
    const shell = electron.shell
    const os = require('os');
        
let mainWindow;

//Listen for app to be ready
app.on("ready", function () {
    //create new window
  mainWindow = new BrowserWindow({webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false },  }, );
  // Load html into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "webService.html"),      
      protocol: "file:",
      slashes: true,
    })
  );
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setAutoHideMenuBar(true);
  mainWindow.maximize()
  // Quit app when closed
  mainWindow.on("closed", function () {
    app.quit();
  });
  
});

app.whenReady().then(() => {
  const Store = require('electron-store');
  Store.initRenderer()
})

ipc.on("openConfig", function() {
  var username = os.userInfo().username;
  // console.log("app.getPath('userData'):" + app.getPath('userData'))
  shell.openPath(app.getPath('userData') + '\\Config.json');
  // shell.openPath('C:\\Users\\' + username + '\\AppData\\Roaming\\webservicetool\\Config.json');
})

