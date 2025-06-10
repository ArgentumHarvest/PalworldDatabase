import ReactDOM from "react-dom/client";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider, theme } from "antd";
import App from "./App";
import "../color.css";
import "./index.css";
import { GlobalProvider } from "@global/index";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <GlobalProvider>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#00b96b",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </GlobalProvider>
  );
}
