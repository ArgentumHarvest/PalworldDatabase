import { LoadingStore } from "@mobx/index";
import { GlobalStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: GlobalStore;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: GlobalStore;
}

/** 根Store接口 */
export interface IGlobalStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  method: IGloablMethods;
}

export interface IGloablMethods { }
