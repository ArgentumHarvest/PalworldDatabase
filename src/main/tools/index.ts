import { BrowserWindow, WebContentsView, app } from "electron";
import { IGloablStore } from "../interface.js";
import { isDev } from "../utils.js";
import path from "path";

/** @function 窗口宽高变化 */
export const windowResize = (store: IGloablStore) => {
  const windowRecord = store.windowList.find(
    (i) => i.id === store.activeWindow
  );
  if (!windowRecord) {
    return;
  }
  const { width, height } = windowRecord.window.getContentBounds();
  windowRecord.width = width;
  windowRecord.height = height;
  const view = windowRecord.viewList.find(
    (item) => item.id === windowRecord.activeView
  );
  if (!view) {
    return;
  }

  let contentHeight = height - 30; // 减去状态栏的高度

  if (contentHeight < 0) {
    contentHeight = 0; // 确保高度不小于0
  }
  windowRecord.width = width;
  windowRecord.height = height;
  windowRecord.contentHeight = contentHeight;

  view.view.setBounds({
    x: 0,
    y: 30,
    width,
    height: contentHeight,
  });
  store.statusView?.setBounds({ x: 0, y: 0, width, height: 30 });
};

/** @function 切换展示的tab */
export const switchTab = (id: string, store: IGloablStore) => {
  const windowRecord = store.windowList.find(
    (i) => i.id === store.activeWindow
  );
  if (!windowRecord) {
    return;
  }
  const view = windowRecord.viewList.find((item) => item.id === id);
  if (!view) {
    return;
  }
  const oldView = windowRecord.viewList.find(
    (item) => item.id === windowRecord.activeView
  );
  if (oldView) {
    oldView.view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
  }

  let viewH = windowRecord.height - 30; // 减去状态栏的高度

  if (viewH < 0) {
    viewH = 0; // 确保高度不小于0
  }

  view.view.setBounds({
    x: 0,
    y: 30,
    width: windowRecord.width,
    height: viewH,
  });
  windowRecord.activeView = id;
};

/** @function 创建一个状态栏 */
export const createStatusView = (
  window: BrowserWindow,
  store: IGloablStore
) => {
  const statusView = new WebContentsView({
    webPreferences: store.webPreferences,
  });
  window.contentView.addChildView(statusView);
  if (isDev()) {
    statusView.webContents.loadURL("http://127.0.0.1:5677/status");
  } else {
    statusView.webContents.loadFile(
      path.join(app.getAppPath() + "/dist/web/status.html")
    );
  }
  const { width } = window.getContentBounds();
  statusView.setBounds({ x: 0, y: 0, width, height: 30 });
  store.statusView = statusView;
};

/** @function 创建一个可视区域 */
export const createView = (window: BrowserWindow, store: IGloablStore) => {
  const view = new WebContentsView({
    webPreferences: store.webPreferences,
  });
  const id = Date.now();
  window.contentView.addChildView(view);
  if (isDev()) {
    view.webContents.loadURL("http://127.0.0.1:5677");
  } else {
    view.webContents.loadFile(
      path.join(app.getAppPath() + "/dist/web/index.html")
    );
  }
  const { width, height } = window.getContentBounds();
  let viewH = height - 30; // 减去状态栏的高度

  if (viewH < 0) {
    viewH = 0; // 确保高度不小于0
  }

  view.setBounds({
    x: 0,
    y: 30,
    width,
    height: viewH,
  });

  const record = {
    id: `view_${id}`,
    view: view,
    title: "新窗口",
  };

  return record;
};

/** @function 添加tab */
export const addTab = (
  info: { title: string; url: string },
  store: IGloablStore
) => {
  const windowRecord = store.windowList.find(
    (i) => i.id === store.activeWindow
  );
  if (!windowRecord) {
    return;
  }

  const record = createView(windowRecord.window, store);
  windowRecord.viewList.push(record);

  const oldView = windowRecord.viewList.find(
    (item) => item.id === windowRecord.activeView
  );
  if (oldView) {
    oldView.view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
  }
  windowRecord.activeView = record.id;
};
