import { app, Menu, MenuItemConstructorOptions } from "electron";
import { IGloablStore } from "./interface.js";
import { addTab, switchTab } from "./tools/index.js";

/** @function 渲染菜单 */
export const updateMenu = (store: IGloablStore) => {
  const activeWindow = store.windowList.find(
    (w) => w.id === store.activeWindow
  );
  const template: MenuItemConstructorOptions[] = [
    {
      label: "退出",
      click: () => {
        app.quit();
      },
    },
    {
      label: "强行退出",
      click: () => {
        app.exit(1);
      },
    },
    {
      label: "重启",
      click: () => {
        app.relaunch();
      },
    },
    {
      label: "【新增窗口】",
      click: () => {
        addTab(
          {
            title: "新窗口",
            path: "",
          },
          store
        );
      },
    },
  ];
  if (activeWindow) {
    for (let v of activeWindow.viewList) {
      let label = v.title;
      if (v.id === activeWindow.activeView) {
        label = `[=${label}=]`;
      }

      template.push({
        label,
        click: () => {
          switchTab(v.id, store);
        },
      });
    }
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
