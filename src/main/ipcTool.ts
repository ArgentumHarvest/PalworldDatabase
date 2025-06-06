import { app, ipcMain } from "electron";
import { IGloablStore } from "./interface.js";
import { addTab, changeTab, removeTab } from "./tools/index.js";

/** @function 监听渲染进程的消息 */
export const ipcServer = (store: IGloablStore) => {
  // 监听窗口大小改变的消息
  ipcMain.on("RESIZE_WINDOW", (event, response) => {
    if (!response.type) {
      return;
    }
    const windowRecord = store.windowList.find(
      (item) => item.id === store.activeWindow
    );
    if (!windowRecord) {
      return;
    }
    switch (response.type) {
      case "maximize":
        {
          windowRecord.window.maximize();
        }
        break;
      case "unmaximize":
        {
          windowRecord.window.unmaximize();
        }
        break;
      case "minimize":
        {
          windowRecord.window.minimize();
        }
        break;
    }
  });
  // 监听窗口关闭的消息
  ipcMain.on("CLOSE_WINDOW", (event, response) => {
    const windowRecord = store.windowList.find(
      (item) => item.id === store.activeWindow
    );
    if (!windowRecord) {
      return;
    }
    windowRecord.window.close();

    store.windowList = store.windowList.filter(
      (item) => item.id !== store.activeWindow
    );
    if (store.windowList.length > 0) {
      store.activeWindow = store.windowList[0].id;
      return;
    }
    app.quit();
  });
  // 监听打开状态栏开发面板
  ipcMain.on("OPEN_STATUS_DEV_TOOLS", (event, response) => {
    store.statusView?.webContents.openDevTools();
  });
  // 监听新增视图信息
  ipcMain.on("ADD_VIEW", (event, response) => {
    addTab(response, store);
  });
  // 关闭视图
  ipcMain.on("DELETE_VIEW", (event, response) => {
    if (!response.id) {
      return;
    }

    removeTab(store, response.id);
  });
  // 切换视图
  ipcMain.on("CHANGE_VIEW", (event, response) => {
    if (!response.id) {
      return;
    }

    changeTab(store, response.id);
  });
};
