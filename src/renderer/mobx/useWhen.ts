import { useRef, useEffect } from "react";
import { when, Lambda, IReactionDisposer } from "mobx";

export function useWhen(cb: () => boolean, effect: Lambda) {
  const whenResult = useRef<IReactionDisposer>(null);

  useEffect(() => {
    whenResult.current = when(cb, () => {
      effect();
    });
    return () => {
      whenResult.current && whenResult.current();
    };
  }, []);
}
