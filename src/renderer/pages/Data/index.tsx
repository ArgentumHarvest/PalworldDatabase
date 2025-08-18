import { useState } from "react";

export const Page = function Page_() {
  const [url, setUrl] = useState("");
  return (
    <div>
      <button
        onClick={async () => {
          const imgBase64 = await window.api.captureScreen();
          setUrl(imgBase64);
        }}
      >
        截图
      </button>
      <div>{url ? <img src={url} /> : "没有获取到截图"}</div>
    </div>
  );
};

export default Page;
