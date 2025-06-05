
import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable
} from '@mobx/index';
import { IRootStore, TLoadingStore, IRefs } from './interface';
import { Logic } from './Logic';
import { Computed } from './Computed'; 


export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore:TLoadingStore;
  refs: IRefs; 
  constructor(refs: IRefs) {
    this.refs = refs; 
    this.loadingStore = new LoadingStore()
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(
      this,
      { refs: false },
      { autoBind: true }
    );
  }
}

export const { Provider, useStore } = createContainer(() => {  
  return useLocalObservable(() => new RootStore({ }));
});
  
  