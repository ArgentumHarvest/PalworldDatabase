import React from "react";
import { observer } from "@mobx/index";
import { Provider, useStore } from "./store/RootStore";
import { Button } from "antd";

const DiyStatus = observer(function diy_status_() {
  const root = useStore();

  return (
    <div className="flex items-center justify-between h-[30px] gap-2 overflow-hidden">
      <div className="flex-1 overflow-hidden">帕鲁百科</div>
      <div>
        <Button>最小化</Button>
        <Button>向下还原</Button>
        <Button>最大化</Button>
        <Button>关闭</Button>
      </div>
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
