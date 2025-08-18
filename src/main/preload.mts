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
  captureScreen: async () => {
    // 直接调用标准 API
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    const video = document.createElement("video");
    video.srcObject = stream;
    await video.play();

    // 绘制到 canvas
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return "";
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 停止流
    stream.getTracks().forEach((track) => track.stop());

    return canvas.toDataURL("image/png");
  },
};

// 使用 contextBridge 将 API 暴露给渲染进程
contextBridge.exposeInMainWorld("api", api);
