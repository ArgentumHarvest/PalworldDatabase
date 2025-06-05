import { app, BrowserWindow, WebContentsView } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { IGloablStore, IWebView } from "./interface.js";
import { windowResize } from "./tools/index.js";
import { autoUpdateApp } from "./update.js";
import { globalRegister } from "./register.js";

const store: IGloablStore = {
  windowList: [],
  activeWindow: "",
  statusView: null,
};

app.on("ready", () => {
  const width = 400;
  const height = 400;
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    title: "OA",
    frame: false,
    autoHideMenuBar: true,
  });
  const szie = mainWindow.getContentBounds();
  const viewList: IWebView[] = [];

  // 自定义状态栏

  const statusView = new WebContentsView();
  mainWindow.contentView.addChildView(statusView);
  if (isDev()) {
    statusView.webContents.loadURL("http://127.0.0.1:5677/status");
  } else {
    statusView.webContents.loadFile(
      path.join(app.getAppPath() + "/dist/web/status.html")
    );
  }

  statusView.setBounds({ x: 0, y: 0, width: szie.width, height: 30 });

  store.statusView = statusView;

  const view1 = new WebContentsView();
  const id = Date.now();
  viewList.push({
    id: `view_${id}`,
    view: view1,
    title: "OA",
  });
  mainWindow.contentView.addChildView(view1);

  if (isDev()) {
    view1.webContents.loadURL("http://127.0.0.1:5677");
  } else {
    view1.webContents.loadFile(
      path.join(app.getAppPath() + "/dist/web/index.html")
    );
  }

  let viewH = szie.height - 30;
  if (viewH < 0) {
    viewH = 0;
  }

  view1.setBounds({ x: 0, y: 30, width: szie.width, height: viewH });

  store.windowList.push({
    window: mainWindow,
    id: `window_${id}`,
    visible: true,
    viewList,
    activeView: `view_${id}`,
    width,
    height,
  });
  store.activeWindow = `window_${id}`;
  globalRegister(store);
  autoUpdateApp();
  // 监听窗口大小变化
  mainWindow.on("resize", () => {
    const { width, height } = mainWindow.getContentBounds();
    windowResize(width, height, store);
  });
});
