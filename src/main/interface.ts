import { BrowserWindow, WebContentsView, WebPreferences } from "electron";

/** @interface 页面信息 */
export interface IWebView {
  id: string;
  view: WebContentsView;
  title: string;
}

/** @interface 全局状态信息 */
export interface IGloablStore {
  /** @param 窗口信息 */
  windowList: IBrowserWindowRecord[];
  /** @param 当期展示的窗口 */
  activeWindow: string;
  /** @param 状态栏视图 */
  statusView: WebContentsView | null;
  /** @param 配置信息 */
  webPreferences?: WebPreferences;
}

/** @interface 窗口信息 */
export interface IBrowserWindowRecord {
  /** @param 窗口 */
  window: BrowserWindow;
  /** @param id */
  id: string;
  /** @param 是否可见 */
  visible: boolean;
  /** @param 视图信息 */
  viewList: IWebView[];
  /** @param 当期展示的视图 */
  activeView: string;
  /** @param 窗口宽度 */
  width: number;
  /** @param 窗口可视区域高度 */
  height: number;
  /** @param 窗口内容可用高度-去除状态栏 */
  contentHeight: number;
}

export interface IPreloadApi {
  /** @param 渲染进程向主进程发送消息 */
  send: (channel: TIpcEventType, ...args: any) => void;
  /** @param 渲染进程向主进程发送消息 */
  invoke: (channel: TIpcEventType, ...args: any) => any;
  /** @param 用于渲染进程监听主进程发出的消息 */
  receive: (channel: TIpcMianEventType, func: (...args: any) => void) => void;
}

/** @type 主进程通知渲染进程的事件 */
export type TIpcMianEventType =
  /** @param 跳转页面 */
  "NAVIGATE";

/** @type 渲染进程通知主进程的事件 */
export type TIpcEventType =
  /** @param 返回页面跳转结果 */
  | "NAVIGATE_RESPONSE"
  /** @param 修改窗口大小 */
  | "RESIZE_WINDOW"
  /** @param 修改菜单显示状态 */
  | "CHANGE_MENU_VISIBLE"
  /** @param 修改应用置顶状态 */
  | "SET_ALWAYS_ON_TOP"
  /** @param 将文件写入doc并保存到本地 */
  | "WRITE_DATA_TO_DOC";
