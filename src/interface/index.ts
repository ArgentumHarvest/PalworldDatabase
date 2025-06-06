export type TResizeType =
  /** @param 最小化 */
  | "minimize"
  /** @param 取消最大化 */
  | "unmaximize"
  /** @param 最大化 */
  | "maximize";

/** @interface 视图tab定义 */
export interface IVewTab {
  id: string;
  title: string;
  isActive: boolean;
  /** @param 是否可以关闭 */
  closeable: boolean;
}
