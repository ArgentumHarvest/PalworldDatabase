import { observer } from "@mobx/index";
import { useGlobal } from "@/store/RootStore";
import { Link, useLocation } from "react-router";
import { classNames } from "@/utils/tool";
import { Tooltip } from "antd";

export const Sidebar = observer(function Sidebar_() {
  const root = useGlobal();
  const { logic } = root;
  const location = useLocation();

  const list = [
    {
      title: "首页",
      path: "/",
      icon: "icon-52shouye-1",
    },
    {
      title: "数据",
      path: "/data",
      icon: "icon-18gengduo",
    },
  ];

  return (
    <div className="w-[50px] bg-[var(--side-bg)] shadow-amber-50 shadow-xs flex flex-col gap-1">
      {list.map((l) => {
        const active = location.pathname === l.path;
        return (
          <Link
            to={l.path}
            key={l.path}
            className={classNames({
              "flex flex-col items-center justify-center mx-1 h-[50px] rounded-sm":
                true,
              "bg-[var(--bg-hover)] ": active,
            })}
          >
            <i className={`iconfont font-bold text-xl ${l.icon}`}></i>
            <span className="text-xs">{l.title}</span>
          </Link>
        );
      })}
      <Tooltip title="在新窗口打开当前页面" placement="right">
        <div
          className="flex flex-col cursor-pointer items-center justify-center mx-1 h-[50px] rounded-sm"
          onClick={() => {
            const item = list.find((r) => r.path === location.pathname);
            if (!item) {
              return;
            }

            window.api.send("ADD_VIEW", {
              title: item.title,
              path: item.path,
            });
          }}
        >
          <i className={`iconfont font-bold text-xl icon-62tianjia`}></i>
        </div>
      </Tooltip>
    </div>
  );
});
