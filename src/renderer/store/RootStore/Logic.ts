import { makeAutoObservable } from "@mobx/index";
import { ILogic, TLoadingStore } from "./interface";
import { GlobalStore } from "./";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: GlobalStore;
  count = 1;
  constructor(rootStore: GlobalStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addCount() {
    this.count = this.count + 1;
  }

  init() {
    console.log("初始化完成");
  }
}
/*#__PURE__*/ export function refresh() {}
