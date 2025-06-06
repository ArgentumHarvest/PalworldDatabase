import { makeAutoObservable } from "@mobx/index";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { TResizeType } from "@/../interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  isMax = false;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeIsMax(isMax: boolean) {
    this.isMax = isMax;
  }

  resize(type: TResizeType) {
    window.api.send("RESIZE_WINDOW", {
      type: type,
    });
  }

  close() {
    window.api.send("CLOSE_WINDOW");
  }
}
