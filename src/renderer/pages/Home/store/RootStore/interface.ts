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
  /** @param 搜索内容 */
  searchVal: string;
  /** @param 全部的内容index */
  indexList: number[];
  /** @param 需要展示的内容index */
  showIndexSet: Set<number>;
  /** @function 清空搜索参数 */
  onClear(): void;
  /** @function 搜索 */
  toSearch: () => void;
  /** @function 修改搜索内容 */
  changeSearchVal(v?: string): void;
  /** @function 数据初始化 */
  init(): void;
  /** @function 快捷搜索 */
  selectLabel(text: string): void;
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
