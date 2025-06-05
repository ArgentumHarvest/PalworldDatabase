import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
} from "@mobx/index";
import { IGloablMethods, IGlobalStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";

export class GlobalStore implements IGlobalStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  method: IGloablMethods;
  constructor(method: IGloablMethods) {
    this.method = method;
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { method: false }, { autoBind: true });
  }
}

const { Provider, useStore } = createContainer(() => {
  return useLocalObservable(() => new GlobalStore({}));
});

export const { GlobalProvider, useGlobal } = {
  GlobalProvider: Provider,
  useGlobal: useStore,
};
