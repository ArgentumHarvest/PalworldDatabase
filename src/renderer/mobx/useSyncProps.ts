import { useEffect } from 'react';
function useSyncProps<K = any>(store: any, key: (keyof K)[], val: any): void
function useSyncProps<K = any>(store: any, key: keyof K, val: any): void
function useSyncProps(store: any, key: any, val: any): void {

  useEffect(() => {
    if (!store.propsStore) {
      throw new Error('please create `propsStore` in caller');
    }
    if (Array.isArray(key)) {
      key.forEach(item => {
        store.propsStore.syncProps(item, val[item]);
      })
    } else {
      store.propsStore.syncProps(key, val);
    }

  }, Array.isArray(key) ? [...key.map(item => val[item])] : [val]);
}

export { useSyncProps }