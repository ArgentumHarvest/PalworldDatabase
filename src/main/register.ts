import { globalShortcut } from "electron";
import { IGloablStore } from "./interface.js";

/** @function 注册快捷键 */
export const globalRegister = (store: IGloablStore) => {
  /** @function 打开调试面板 */
  globalShortcut.register("CmdOrCtrl+I", () => {
    const window = store.windowList.find((w) => w.id === store.activeWindow);
    console.log(7, window);
    if (!window) {
      return;
    }

    const view = window.viewList.find((v) => v.id === window.activeView);
    console.log(6, view);
    if (!view) {
      window.window.webContents.openDevTools();
      return;
    }
    console.log(5, view);
    view.view.webContents.openDevTools();
  });
};
