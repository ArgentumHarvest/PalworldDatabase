import { useEffect, useState } from "react";
import { Button, Progress } from "antd";

export default function Upgrade() {
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    // 跳转到此页面，立刻开始下载
    window.api.send("DOWNLOAD_UPDATE");
    // 同时同步监听下载进度
    window.api.receive("DOWNLOAD_PROGRESS", (prog: any) => {
      setProgress(prog);
    });
    // 监听下载完成
    window.api.receive("UPDATE_DOWNLOADED", (info) => {
      // 提示用户安装更新
      console.log("update-downloaded: ", info);
      // 下载完成设置 progress 为 100
      setProgress(100);
    });
  }, []);
  // 安装更新
  const installupdate = () => {
    window.api.send("INSTALL_UPDATE");
  };
  return (
    <div>
      <Progress type="circle" percent={progress} size={320} />
      {progress >= 100 ? (
        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          应用下载完成
          <Button
            onClick={installupdate}
            type="primary"
            style={{ marginTop: 20 }}
            size="large"
          >
            退出并安装更新
          </Button>
        </h1>
      ) : (
        <h1>正在下载更新...</h1>
      )}
    </div>
  );
}
