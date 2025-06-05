import { Button } from "antd";
import { Link, Outlet } from "react-router";

export const Page = function Page_() {
  return (
    <div className="flex h-[100vh] overflow-hidden">
      <div className="w-[60px] bg-orange-800">侧边栏</div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex gap-2 bg-gray-400">
          <div className="flex-1 flex items-center overflow-hidden gap-2">
            <Link to="/">首页</Link>
            <Link to="/data">数据</Link>
          </div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Page;
