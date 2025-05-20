import 'dotenv/config';
import { app, BrowserWindow, screen, session } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { initializeIpcHandlers } from './IpcHandlers.js';

function CreateMainWindow() {
  const scaleFactor = screen.getPrimaryDisplay().scaleFactor;
  console.log('DPI Scale Factor:', scaleFactor);


  const mainWindow = new BrowserWindow({
    frame: false,
    width: 1920,
    height: 1080,
    resizable: false,
    icon: path.join(app.getAppPath(), 'resources/icon.png'),
    webPreferences: {
      preload: path.join(app.getAppPath(), 'dist-electron/preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

   mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(0.6944444179534912);
  });

  initializeIpcHandlers(mainWindow);

  if (!isDev) {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
  } else {
    mainWindow.loadURL('https://myapp:3000/'); 
  }
}

app.whenReady().then(CreateMainWindow);
