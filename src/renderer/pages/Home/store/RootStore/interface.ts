import { LoadingStore } from "@mobx/index";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { GlobalStore } from "@/store/RootStore";
import { IPalRecord } from "../../../../../interface";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 帕鲁信息 */
  dataSource: IPalRecord[];
  /** @function 数据初始化 */
  init(): void;
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
  global: GlobalStore;
}

export interface IRefs {}
