import { WebContentsView, app } from "electron";
import { IGloablStore } from "../interface.js";
import { isDev } from "../utils.js";
import path from "path";
import { updateMenu } from "../menu.js";

/** @function 窗口宽高变化 */
export const windowResize = (
  width: number,
  height: number,
  store: IGloablStore
) => {
  const windowRecord = store.windowList.find(
    (i) => i.id === store.activeWindow
  );
  if (!windowRecord) {
    return;
  }
  windowRecord.width = width;
  windowRecord.height = height;
  const view = windowRecord.viewList.find(
    (item) => item.id === windowRecord.activeView
  );
  if (!view) {
    return;
  }

  let viewH = height - 30; // 减去状态栏的高度

  if (viewH < 0) {
    viewH = 0; // 确保高度不小于0
  }

  view.view.setBounds({
    x: 0,
    y: 30,
    width,
    height: viewH,
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
  updateMenu(store);
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
  const view = new WebContentsView();
  const id = Date.now();
  windowRecord.viewList.push({
    id: `view_${id}`,
    view: view,
    title: info.title,
  });

  windowRecord.window.contentView.addChildView(view);
  if (isDev()) {
    view.webContents.loadURL("http://127.0.0.1:5677");
  } else {
    view.webContents.loadFile(
      path.join(app.getAppPath() + "/dist/web/index.html")
    );
  }

  let viewH = windowRecord.height - 30; // 减去状态栏的高度

  if (viewH < 0) {
    viewH = 0; // 确保高度不小于0
  }

  view.setBounds({
    x: 0,
    y: 30,
    width: windowRecord.width,
    height: viewH,
  });
  const oldView = windowRecord.viewList.find(
    (item) => item.id === windowRecord.activeView
  );
  if (oldView) {
    oldView.view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
  }
  windowRecord.activeView = `view_${id}`;
  updateMenu(store);
};
