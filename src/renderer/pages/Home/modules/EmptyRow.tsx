import { observer } from "@mobx/index";
import { useStore } from "../store/RootStore";
import { Button, Empty } from "antd";

export const EmptyRow = observer(function EmptyRow_() {
  const root = useStore();
  const { logic } = root;
  if (logic.showIndexSet.size) {
    return null;
  }
  return (
    <div className="flex flex-col w-full py-[5vh] items-center justify-center bg-[var(--bg-d-mask-5)] rounded-xl">
      <Empty description="没有找到相关的帕鲁" />
      <Button onClick={logic.onClear} className="mt-2">
        清空搜索条件
      </Button>
    </div>
  );
});
