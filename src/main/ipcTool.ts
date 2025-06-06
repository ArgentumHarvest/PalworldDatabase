import { ipcMain } from "electron";
import { IGloablStore } from "./interface.js";

/** @function 监听渲染进程的消息 */
export const ipcServer = (store: IGloablStore) => {
  // 监听窗口大小改变的消息
  ipcMain.on("RESIZE_WINDOW", (event, response) => {
    console.info("收到渲染进程响应:", response);
  });
};
