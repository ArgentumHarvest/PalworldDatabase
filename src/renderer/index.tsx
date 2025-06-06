import ReactDOM from "react-dom/client";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import App from "./App";
import "../color.css";
import "./index.css";
import { GlobalProvider } from "@global/index";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <GlobalProvider>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </GlobalProvider>
  );
}
