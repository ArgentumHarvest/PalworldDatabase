import React from 'react';
const EMPTY: unique symbol = Symbol();
export interface ContainerProviderProps {
  children: React.ReactNode;
}
export function createContainer<Value>(useHook: () => Value) {
  let Context = React.createContext<Value | typeof EMPTY>(EMPTY);
  const Provider = (props: ContainerProviderProps) => {
    const store = useHook();

    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };
  function useStore(): Value {
    let value = React.useContext(Context);
    if (value === EMPTY) {
      throw new Error('Component must be wrapped with <Container.Provider>');
    }
    return value;
  }
  return {
    Provider,
    useStore,
  };
}
