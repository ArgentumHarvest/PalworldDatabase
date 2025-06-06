// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { IPreloadApi } from "./interface.js";

// 定义 API 实现
const api: IPreloadApi = {
  send: (channel, ...arg) => {
    ipcRenderer.send(channel, ...(arg || []));
  },
  invoke: (channel, ...arg) => {
    return ipcRenderer.invoke(channel, ...(arg || []));
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
};

// 使用 contextBridge 将 API 暴露给渲染进程
contextBridge.exposeInMainWorld("api", api);
