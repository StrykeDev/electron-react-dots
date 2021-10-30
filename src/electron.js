/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, screen, shell } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { shutdown, reboot, hibernate } = require('electron-shutdown-command');

const APP_WIDTH = 320;
const APP_HEIGHT = 600;
const APP_PADDING = 100;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
   const display = screen.getPrimaryDisplay();
   const { width: screenWidth, height: screenHeight } = display.workAreaSize;

   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      x: screenWidth - APP_WIDTH - APP_PADDING,
      y: screenHeight - APP_HEIGHT - APP_PADDING,

      title: 'Dots',
      frame: false,

      hasShadow: false,
      transparent: true,

      fullscreenable: false,
      skipTaskbar: true,
      alwaysOnTop: true,
      resizable: false,
      movable: false,
      kiosk: true,
      webPreferences: {
         nodeIntegration: true,
      },
   });

   // and load the index.html of the app.
   // win.loadFile("index.html");
   mainWindow.loadURL(
      isDev
         ? 'http://localhost:3000'
         : `file://${path.join(__dirname, '../build/index.html')}`,
   );
   // Open the DevTools.
   if (isDev) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
   }

   // Handle links and actions
   mainWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      const [type, action] = url.split(':');

      switch (type) {
         case 'action':
            switch (action) {
               case 'shutdown':
                  shutdown({
                     force: true,
                     sudo: true,
                     debug: true,
                     timerseconds: 5,
                  });
                  break;
               case 'reboot':
                  reboot({
                     force: true,
                     sudo: true,
                     debug: true,
                     timerseconds: 5,
                  });
                  break;
               case 'sleep':
                  hibernate({
                     force: true,
                     sudo: true,
                     debug: true,
                     timerseconds: 5,
                  });
                  break;
               default:
                  throw new Error(`Invalid action: ${action}`);
            }
            break;

         default:
            shell.openExternal(url);
            break;
      }
   });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});
