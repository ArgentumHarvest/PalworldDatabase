import { app, desktopCapturer, ipcMain, session } from "electron";
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
      case "setAlwaysOnTop":
        {
          windowRecord.window.setAlwaysOnTop(true);
        }
        break;
      case "cancelSetAlwaysOnTop":
        {
          windowRecord.window.setAlwaysOnTop(false);
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
  // 获取所有屏幕源
  ipcMain.handle("GET_SOURCES", async () => {
    const sources = await desktopCapturer.getSources({ types: ["screen"] });
    const output = sources.map((s) => ({ id: s.id, name: s.name }));
    console.log(666, output);
    return output;
  });
  // 初始化截图的屏幕
  ipcMain.handle("SET_SOURCE", (event, response) => {
    if (!response.id) {
      return;
    }
    // 设置捕获处理器
    session.defaultSession.setDisplayMediaRequestHandler(
      (request, callback) => {
        desktopCapturer.getSources({ types: ["screen"] }).then((sources) => {
          let video = sources.find((r) => r.id === response.id);
          if (!video) {
            console.log("未检测到目标屏幕，已初始化为的第一个屏幕");
            video = sources[0];
          } else {
            console.log(`当前屏幕已初始化为${response.id}`);
          }
          // 这里你可以选择指定的屏幕，比如 sources[0] 就是主屏幕
          callback({ video });
        });
      }
    );
    return true;
  });
};
