const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronStore', {
  get: (key) => ipcRenderer.invoke('electron-store-get', key),
  set: (key, value) => ipcRenderer.invoke('electron-store-set', key, value),
});

contextBridge.exposeInMainWorld('electron', {
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
});
