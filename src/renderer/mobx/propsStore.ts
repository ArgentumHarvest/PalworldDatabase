import { makeAutoObservable } from "mobx";

export interface IPropsStore {
  /**
   * @desc 同步props的方法
   * @param key keyof props
   * @param val props value
   * @return
   */
  syncProps: (key: any, val: any) => void;

  props: any;
}
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null;
export type Builtin = Primitive | Function | Date | Error | RegExp;

/** Like Readonly but recursive */
export type DeepReadonly<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends {}
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : unknown extends T
  ? unknown
  : Readonly<T>;

export class PropsStore<P = { [x: string]: any }> implements IPropsStore {
  private _props: DeepReadonly<P>;
  constructor(defaultProps: DeepReadonly<P> = {} as DeepReadonly<P>) {
    this._props = defaultProps;
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
  }

  syncProps(key: string, val: any) {
    // @ts-ignore
    this._props[key] = val;
  }
  get props(): DeepReadonly<P> {
    return this._props;
  }
}
