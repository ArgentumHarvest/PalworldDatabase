import { makeAutoObservable } from "@mobx/index";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { TResizeType } from "@/../interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  isMax = false;
  count = 1;
  timer: NodeJS.Timeout | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    window.api.receive("IS_MAXIMIZE", (res) => {
      this.changeIsMax(!!res?.isMax);
    });
  }

  addCount() {
    this.count += 1;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.count > 7) {
      this.count = 0;
      window.api.send("OPEN_STATUS_DEV_TOOLS");
      return;
    }
    this.timer = setTimeout(() => {
      this.count = 0;
    }, 500);
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
