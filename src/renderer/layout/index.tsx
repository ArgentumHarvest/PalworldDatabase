import { Outlet, useNavigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { useEffect } from "react";
import { Modal } from "antd";

export const Page = function Page_() {
  const navigate = useNavigate();
  useEffect(() => {
    window.api.receive("UPDATE_AVAILABLE", (info: any) => {
      // 显示 UI 提示用户有更新可用
      console.log("update-available: ", info);
      Modal.confirm({
        title: `检测到新版本：${info.version}`,
        content: "点击确定立即更新",
        onOk: () => {
          navigate("/upgrade");
        },
        onCancel: () => {
          console.log("取消更新");
        },
      });
    });
  }, []);

  return (
    <div className="flex h-[100vh] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Page;
