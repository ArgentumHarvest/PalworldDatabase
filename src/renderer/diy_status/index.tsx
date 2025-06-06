import { observer, useWhen } from "@mobx/index";
import { Provider, useStore } from "./store/RootStore";
import { OptionRow } from "./modules/OptionRow";

const DiyStatus = observer(function diy_status_() {
  const root = useStore();

  useWhen(
    () => true,
    () => {
      window.api.receive("IS_MAXIMIZE", (res) => {
        console.log(777, res);
        root.logic.changeIsMax(!!res?.isMax);
      });
    }
  );

  return (
    <div className="flex items-center justify-between h-[30px] gap-2 overflow-hidden">
      <div className="flex-1 overflow-hidden">帕鲁百科</div>
      <OptionRow />
    </div>
  );
});

export default observer(function diy_statusPage() {
  return (
    <Provider>
      <DiyStatus />
    </Provider>
  );
});
