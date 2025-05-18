import 'dotenv/config';
import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { initializeIpcHandlers } from './IpcHandlers.js';

function CreateMainWindow() {

  const mainWindow = new BrowserWindow({
    frame: true,
    width: 1920,
    height: 1080,
    resizable: false,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'dist-electron/preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  initializeIpcHandlers(mainWindow);


  if (!isDev) {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
  } else {
    mainWindow.loadURL('https://myapp:3000/');
  }

}

app.whenReady().then(CreateMainWindow);
