const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url'); // Re-added url import

let store; // Declare store outside but initialize later

// Determine the environment
const isDev = process.env.NODE_ENV === 'development';

async function createWindow() { // Made async
  // Dynamically import electron-store
  const { default: Store } = await import('electron-store');
  store = new Store(); // Initialize store here

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load the app.
  // In dev, load from the Vite dev server.
  // In prod, load the built index.html.
  const startUrl = isDev
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, 'dist', 'index.html'),
        protocol: 'file:',
        slashes: true,
      });

  mainWindow.loadURL(startUrl);

  // IPC handlers for electron-store
  ipcMain.handle('electron-store-get', (event, key) => {
    return store.get(key);
  });
  ipcMain.handle('electron-store-set', (event, key, value) => {
    store.set(key, value);
  });

  ipcMain.handle('open-file-dialog', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
    });

    if (canceled) {
      return null;
    } else {
      return filePaths[0];
    }
  });
}

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});