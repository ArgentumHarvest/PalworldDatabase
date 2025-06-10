import { makeAutoObservable } from "mobx";

export interface ILoadingStore<T> {
  set: (key: T, val: boolean) => void;
  get: (key: T) => boolean | undefined;
}

export class LoadingStore<T> implements ILoadingStore<T> {
  loadingMap = new Map<T, boolean>();
  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
  }

  set(key: T, val: boolean) {
    this.loadingMap.set(key, val);
  }
  get(key: T) {
    return this.loadingMap.get(key) || false;
  }
}
