import { observer } from "@mobx/index";
import { useStore } from "../store/RootStore";
import { Input } from "antd";

export const Search = observer(function Search_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="w-full">
      <Input.Search
        value={logic.searchVal}
        onChange={(e) => {
          logic.changeSearchVal(e.target.value);
        }}
        allowClear
        onClear={logic.onClear}
        onSearch={logic.toSearch}
        placeholder="请输入关键字"
        size="large"
      />
    </div>
  );
});
