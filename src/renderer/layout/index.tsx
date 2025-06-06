import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const Page = function Page_() {
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
