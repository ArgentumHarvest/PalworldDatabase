import { app, BrowserWindow } from "electron";
import path from "path";
import { IGloablStore } from "./interface.js";
import { createStatusView, createView, windowResize } from "./tools/index.js";
import { autoUpdateApp } from "./update.js";
import { globalRegister } from "./register.js";
import { fileURLToPath } from "url";
import { ipcServer } from "./ipcTool.js";

const store: IGloablStore = {
  windowList: [],
  activeWindow: "",
  statusView: null,
};

app.on("ready", () => {
  // 创建主窗口
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    title: "OA",
    // 隐藏状态栏
    frame: false,
    // 隐藏菜单栏
    autoHideMenuBar: true,
  });

  store.webPreferences = {
    // 预加载脚本
    preload: path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "preload.mjs"
    ),
    // 启用上下文隔离
    contextIsolation: true,
    // 禁止渲染进程使用nodejs
    nodeIntegration: false,
    // 是否启用沙盒模式，启用后更贴近浏览器模式
    sandbox: false,
  };

  // 自定义状态栏
  createStatusView(mainWindow, store);

  // 展示的内容
  const record = createView(mainWindow, store);
  const window_id = `window_${Date.now()}`;

  const { width, height } = mainWindow.getContentBounds();
  let contentHeight = height - 30;
  if (contentHeight < 0) {
    contentHeight = 0;
  }
  store.windowList.push({
    window: mainWindow,
    id: window_id,
    visible: true,
    viewList: [record],
    activeView: record.id,
    width,
    height,
    contentHeight,
  });
  store.activeWindow = window_id;
  // 注册快捷键
  globalRegister(store);
  // 自动更新
  autoUpdateApp(store);
  // 监听事件
  ipcServer(store);

  // 监听窗口大小变化
  mainWindow.on("resize", () => {
    windowResize(store);
    const isMax = mainWindow.isMaximized();
    store.statusView?.webContents.send("IS_MAXIMIZE", {
      isMax,
    });
  });

  // 监听窗口置顶变化
  mainWindow.on("always-on-top-changed", (event, isAlwaysOnTop) => {
    store.statusView?.webContents.send("IS_ON_TOP", {
      isAlwaysOnTop,
    });
  });
});
