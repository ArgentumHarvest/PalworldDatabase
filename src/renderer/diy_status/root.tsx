import ReactDOM from "react-dom/client";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import App from "./index";
import "../../color.css";
import "./index.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  );
}
