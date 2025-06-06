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
  /** @param 是否为最大化 */
  | "IS_MAXIMIZE"
  /** @param 视图tab变化 */
  | "VIEW_UPDATE";

/** @type 渲染进程通知主进程的事件 */
export type TIpcEventType =
  /** @param 修改窗口大小 */
  | "RESIZE_WINDOW"
  /** @param 关闭窗口 */
  | "CLOSE_WINDOW"
  /** @param 打开自定义状态栏的开发面板 */
  | "OPEN_STATUS_DEV_TOOLS"
  /** @param 修改应用置顶状态 */
  | "SET_ALWAYS_ON_TOP"
  /** @param 新增视图 */
  | "ADD_VIEW"
  /** @param 关闭视图 */
  | "DELETE_VIEW"
  /** @param 切换视图 */
  | "CHANGE_VIEW";
