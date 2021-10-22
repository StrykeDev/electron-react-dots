const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const machine = require('electron-shutdown-command');

const devTools = false;

const width = 400;
const height = 600;
const screenPadding = 100;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const { screen } = require('electron');
  const display = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = display.workAreaSize;

  // Create the browser window.
  const win = new BrowserWindow({
    width: width,
    height: height,
    x: screenWidth - width - screenPadding,
    y: screenHeight - height - screenPadding,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    fullscreenable: false,
    skipTaskbar: true,
    kiosk: true,
    frame: false,
    setMenu: null,
    hasShadow: false,
    transparent: true,
    opacity: 1,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev && devTools) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  // Handle links and actions
  win.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    const [type, action] = url.split(':')

    switch (type) {
      case 'action':
        switch (action) {
          case 'shutdown':
            machine.shutdown({
              force: true,
              sudo: true,
              debug: true,
              timerseconds: 5,
            })
            break;
          case 'reboot':
            machine.reboot({
              force: true,
              sudo: true,
              debug: true,
              timerseconds: 5,
            })
            break;
          case 'sleep':
            machine.hibernate({
              force: true,
              sudo: true,
              debug: true,
              timerseconds: 5,
            })
            break;

          default:
            throw new Error(`Invalid action: ${action}`);
        }
        break;

      default:
        require('electron').shell.openExternal(url);
        break;
    }
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
