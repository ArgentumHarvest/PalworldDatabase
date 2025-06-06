import { observer, useWhen } from "@mobx/index";
import { Provider, useStore } from "./store/RootStore";
import { OptionRow } from "./modules/OptionRow";
import { classNames } from "@/utils/tool";

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
      <div className="flex-1 overflow-hidden flex gap-1 items-center">
        <img
          className="status_logo"
          src="./logo.png"
          alt="logo"
          width={20}
          draggable={false}
          onClick={root.logic.addCount}
        />
        <span className="mr-2">帕鲁百科</span>
        {root.logic.tabs.map((t) => {
          return (
            <div
              key={t.id}
              className={classNames({
                tab_item: true,
                active: t.isActive,
              })}
              onClick={() => {
                if (t.isActive) {
                  return;
                }
                window.api.send("CHANGE_VIEW", {
                  id: t.id,
                });
              }}
            >
              {t.title}
              {t.closeable && (
                <i
                  className="tab_item_close iconfont icon-4guanbi-1"
                  onClick={() => {
                    window.api.send("DELETE_VIEW", {
                      id: t.id,
                    });
                  }}
                ></i>
              )}
            </div>
          );
        })}
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
