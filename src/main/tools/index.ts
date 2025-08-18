import { BrowserWindow, WebContentsView, app, desktopCapturer } from "electron";
import { IGloablStore, IWebView } from "../interface.js";
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
export const createView = (
  window: BrowserWindow,
  store: IGloablStore,
  info?: { title: string; path: string }
) => {
  const view = new WebContentsView({
    webPreferences: store.webPreferences,
  });
  const id = Date.now();
  window.contentView.addChildView(view);
  if (isDev()) {
    const url = `http://127.0.0.1:5677/#${info?.path || ""}`;
    view.webContents.loadURL(url);
  } else {
    const filePath = path.join(app.getAppPath(), "/dist/web/index.html");
    // 如果有路径信息，附加到URL的hash部分
    let url = `file://${filePath}`;
    if (info?.path && info.path !== "/") {
      url += `#${info.path.startsWith("/") ? info.path.slice(1) : info.path}`;
    }
    view.webContents.loadURL(url);
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
    title: info?.title || "新窗口",
  };

  return record;
};

/** @function 添加tab */
export const addTab = (
  info: { title: string; path: string },
  store: IGloablStore
) => {
  const windowRecord = store.windowList.find(
    (i) => i.id === store.activeWindow
  );
  if (!windowRecord) {
    return;
  }

  const record = createView(windowRecord.window, store, info);
  windowRecord.viewList.push(record);

  const oldView = windowRecord.viewList.find(
    (item) => item.id === windowRecord.activeView
  );
  if (oldView) {
    oldView.view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
  }
  windowRecord.activeView = record.id;

  store.statusView?.webContents.send("VIEW_UPDATE", {
    viewList: windowRecord.viewList.map((r, rIndex) => {
      return {
        id: r.id,
        title: r.title,
        isActive: r.id === windowRecord.activeView,
        closeable: rIndex !== 0,
      };
    }),
  });
};

/** @function 移除tab */
export const removeTab = (store: IGloablStore, id: string) => {
  const windowRecord = store.windowList.find(
    (i) => i.id === store.activeWindow
  );
  if (!windowRecord) {
    return;
  }

  const currentRecord = windowRecord.viewList.find((r) => r.id == id);
  if (!currentRecord) {
    return;
  }

  const newViewList = windowRecord.viewList.filter((r) => r.id !== id);

  if (id === windowRecord.activeView) {
    const nextActive = newViewList[0];
    windowRecord.activeView = nextActive.id;
    const { width, height } = windowRecord.window.getContentBounds();
    let viewH = height - 30; // 减去状态栏的高度

    if (viewH < 0) {
      viewH = 0; // 确保高度不小于0
    }

    nextActive.view.setBounds({
      x: 0,
      y: 30,
      width,
      height: viewH,
    });
  }

  windowRecord.window.contentView.removeChildView(currentRecord.view);
  windowRecord.viewList = newViewList;
  store.statusView?.webContents.send("VIEW_UPDATE", {
    viewList: windowRecord.viewList.map((r, rIndex) => {
      return {
        id: r.id,
        title: r.title,
        isActive: r.id === windowRecord.activeView,
        closeable: rIndex !== 0,
      };
    }),
  });
};

/** @function 切换tab */
export const changeTab = (store: IGloablStore, id: string) => {
  const windowRecord = store.windowList.find(
    (i) => i.id === store.activeWindow
  );
  if (!windowRecord || windowRecord.activeView === id) {
    return;
  }

  let currentRecord: IWebView | null = null;
  let nextRecord: IWebView | null = null;

  for (let v of windowRecord.viewList) {
    if (v.id === windowRecord.activeView) {
      currentRecord = v;
      continue;
    }
    if (v.id === id) {
      nextRecord = v;
      continue;
    }
  }

  if (!currentRecord || !nextRecord) {
    return;
  }

  const { width, height } = windowRecord.window.getContentBounds();
  let viewH = height - 30; // 减去状态栏的高度

  if (viewH < 0) {
    viewH = 0; // 确保高度不小于0
  }

  nextRecord.view.setBounds({
    x: 0,
    y: 30,
    width,
    height: viewH,
  });

  currentRecord.view.setBounds({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  windowRecord.activeView = id;

  store.statusView?.webContents.send("VIEW_UPDATE", {
    viewList: windowRecord.viewList.map((r, rIndex) => {
      return {
        id: r.id,
        title: r.title,
        isActive: r.id === windowRecord.activeView,
        closeable: rIndex !== 0,
      };
    }),
  });
};
