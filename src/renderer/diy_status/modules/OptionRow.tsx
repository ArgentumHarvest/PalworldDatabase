import { observer } from "@mobx/index";
import { useStore } from "../store/RootStore";

export const OptionRow = observer(function OptionRow_() {
  const root = useStore();
  const { logic } = root;

  const list = [
    {
      icon: "icon-zhiding1",
      text: "置顶",
      className: logic.isTop ? "hidden" : "",
      onClick: () => {
        logic.resize("setAlwaysOnTop");
      },
    },
    {
      icon: "icon-zhiding",
      text: "取消置顶",
      className: logic.isTop ? "" : "hidden",
      onClick: () => {
        logic.resize("cancelSetAlwaysOnTop");
      },
    },
    {
      icon: "icon-2zuixiaohua-1",
      text: "最小化",
      onClick: () => {
        logic.resize("minimize");
      },
    },
    {
      icon: "icon-3zuidahua-1",
      text: "最大化",
      className: logic.isMax ? "hidden" : "",
      onClick: () => {
        logic.resize("maximize");
      },
    },
    {
      icon: "icon-3zuidahua-3",
      text: "取消最大化",
      className: logic.isMax ? "" : "hidden",
      onClick: () => {
        logic.resize("unmaximize");
      },
    },
    {
      icon: "icon-4guanbi-1",
      className: "close-icon",
      text: "关闭",
      onClick: () => {
        logic.close();
      },
    },
  ];

  return (
    <div className="status_options">
      {list.map((b) => {
        return (
          <div
            title={b.text}
            key={b.text}
            onClick={b.onClick}
            className={`status_option_item ${b.className || ""}`}
          >
            <i className={`iconfont ${b.icon}`}></i>
          </div>
        );
      })}
    </div>
  );
});
