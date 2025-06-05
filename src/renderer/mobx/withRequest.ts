export function isPromise(obj: any): obj is Promise<any> {
  return Object.prototype.toString.call(obj) === "[object Promise]";
}

interface Store {
  set(key: string, value: boolean): void;
}

interface Context {
  loadingStore?: Store;
}

export function withRequest(
  fn: Function,
  name?: string
): (this: Context) => Promise<any> {
  let flag = false;
  return async function () {
    if (flag) return;
    flag = true;
    const loadingKey = name;
    if (loadingKey) {
      if (!this.loadingStore) {
        throw new Error("please create `loadingStore` in caller");
      }
      this.loadingStore.set(loadingKey, true);
    }
    const ret = fn.call(this, ...arguments);
    if (!isPromise(ret)) {
      throw new Error("please use promise");
    }
    return ret.finally(() => {
      if (loadingKey) {
        this.loadingStore?.set(loadingKey, false);
      }
      flag = false;
    });
  };
}
