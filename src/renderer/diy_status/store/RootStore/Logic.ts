import { makeAutoObservable } from "@mobx/index";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IVewTab, TResizeType } from "@/../interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  isMax = false;
  isTop = false;
  count = 1;
  timer: NodeJS.Timeout | null = null;
  tabs: IVewTab[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    window.api.receive("IS_MAXIMIZE", (res) => {
      this.changeIsMax(!!res?.isMax);
    });
    window.api.receive("IS_ON_TOP", (res) => {
      this.changeIsTop(!!res?.isAlwaysOnTop);
    });
    window.api.receive("VIEW_UPDATE", (res) => {
      this.tabs = res?.viewList || [];
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

  changeIsTop(isTop: boolean) {
    this.isTop = isTop;
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
