import { LoadingStore } from "@mobx/index";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IVewTab, TResizeType } from "../../../../interface";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 是否最大化 */
  isMax: boolean;
  /** @param 点击次数，达到7打开开发面板 */
  count: number;
  /** @param 定时器，超过500ms未点击重新计数 */
  timer: NodeJS.Timeout | null;
  /** @param 标签页 */
  tabs: IVewTab[];
  /** @function 增加点击次数 */
  addCount(): void;
  /** @function 修改最大化 */
  changeIsMax(isMax: boolean): void;
  /** @function 修改窗口大小 */
  resize(type: TResizeType): void;
  /** @function 关闭窗口 */
  close(): void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
}

export interface IRefs {}
