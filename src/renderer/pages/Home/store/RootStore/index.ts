
import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable
} from '@mobx/index';
import { IRootStore, TLoadingStore, IRefs } from './interface';
import { Logic } from './Logic';
import { Computed } from './Computed';
import { GlobalStore, useGlobal } from "@/store/RootStore";


export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore:TLoadingStore;
  refs: IRefs;
  global: GlobalStore; 
  constructor(global: GlobalStore, refs: IRefs) {
    this.refs = refs;
    this.global = global;
    this.loadingStore = new LoadingStore()
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(
      this,
      { refs: false, global: false },
      { autoBind: true }
    );
  }
}

export const { Provider, useStore } = createContainer(() => { 
  const global = useGlobal();
  return useLocalObservable(() => new RootStore(global, { }));
});
  
  