import { makeAutoObservable } from "mobx";

export interface ILoadingStore<T> {
  /**
   * @desc 更改loading的方法
   * @param key loading的key
   * @param val loading的值
   * @return
   */
  set: (key: T, val: boolean) => void;

  /**
   * @desc 获得loading的方法
   * @param  key loading的key
   * @return loading的值
   */
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
