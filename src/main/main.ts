import { app, BrowserWindow } from "electron";
import path from "path";
import { IGloablStore } from "./interface.js";
import { createStatusView, createView, windowResize } from "./tools/index.js";
import { autoUpdateApp } from "./update.js";
import { globalRegister } from "./register.js";
import { fileURLToPath } from "url";
import { ipcServer } from "./ipcTool.js";
import { updateMenu } from "./menu.js";

const store: IGloablStore = {
  windowList: [],
  activeWindow: "",
  statusView: null,
};

app.on("ready", () => {
  console.log("222-ready");
  // 创建主窗口
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    title: "OA",
  });

  mainWindow.webContents.loadURL("https://liuqi.cool/");

  updateMenu(store);
});

app.on("window-all-closed", () => {
  console.log("333-window-all-closed");
  app.quit();
});

app.on("will-finish-launching", () => {
  console.log("111-will-finish-launching");
});

app.on("before-quit", (e) => {
  console.log("444-before-quit");
});
app.on("will-quit", (e) => {
  console.log("555-will-quit");
});
app.on("quit", (e, c) => {
  console.log("666-quit", e, c);
});
app.on("browser-window-blur", (e, c) => {
  console.log("777-browser-window-blur", e, c.id);
});
app.on("browser-window-focus", (e, c) => {
  console.log("888-browser-window-blur", e, c.id);
});
app.on("browser-window-created", (e, c) => {
  console.log("999-browser-window-created", e, c.id);
});
app.on("web-contents-created", (e, c) => {
  console.log("101010-web-contents-created", c.id);
});
app.on(
  "certificate-error",
  (e, wc, url, error, certificate, callback, isMainFrame) => {
    console.log(
      "111111-certificate-error",
      e,
      wc.id,
      url,
      error,
      certificate,
      callback,
      isMainFrame
    );
  }
);
app.on("select-client-certificate", (e, wc, url, certificate, callback) => {
  console.log(
    "121212-select-client-certificate",
    e,
    wc.id,
    url,
    certificate,
    callback
  );
});
app.on("login", (e, wc, authenticationResponseDetails, authInfo, callback) => {
  console.log(
    "131313-select-client-certificate",
    e,
    wc.id,
    authenticationResponseDetails,
    authInfo,
    callback
  );
});
app.on("gpu-info-update", () => {
  console.log("141414-gpu-info-update");
});
app.on("render-process-gone", (event, webContents, details) => {
  console.log("151515-render-process-gone", event, webContents, details);
});
app.on("child-process-gone", (event, details) => {
  console.log("161616-child-process-gone", event, details);
});
app.on(
  "accessibility-support-changed",
  (event, accessibilitySupportEnabled) => {
    console.log(
      "171717-accessibility-support-changed",
      event,
      accessibilitySupportEnabled
    );
  }
);
app.on("session-created", (session) => {
  console.log("181818-session-created", session);
});
app.on("second-instance", (event, argv, workingDirectory, additionalData) => {
  console.log(
    "1919-session-instance",
    event,
    argv,
    workingDirectory,
    additionalData
  );
});
