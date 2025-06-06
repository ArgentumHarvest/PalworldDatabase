import { observer, useWhen } from "@mobx/index";
import { Provider, useStore } from "./store/RootStore";
import { OptionRow } from "./modules/OptionRow";

const DiyStatus = observer(function diy_status_() {
  const root = useStore();

  useWhen(
    () => !!root.logic.init,
    () => {
      root.logic.init();
    }
  );

  return (
    <div className="flex items-center justify-between h-[30px] gap-2 overflow-hidden">
      <div className="flex-1 overflow-hidden flex items-center">
        <img
          className="status_logo"
          src="/logo.png"
          alt="logo"
          width={20}
          draggable={false}
          onClick={root.logic.addCount}
        />
        <span>帕鲁百科</span>
      </div>
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
