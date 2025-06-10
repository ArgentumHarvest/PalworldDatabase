import { observer } from "@mobx/index";
import { useStore } from "../store/RootStore";
import { PalRecord } from "./PalRecord";

export const List = observer(function List_() {
  const root = useStore();
  const { logic } = root;
  return logic.dataSource.map((p) => {
    return <PalRecord record={p} key={p.index} />;
  });
});
