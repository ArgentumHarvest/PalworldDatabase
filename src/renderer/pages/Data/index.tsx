import { Button, Image, Space } from "antd";
import { useRef, useState } from "react";

export const Page = function Page_() {
  const imgRef = useRef(new Map<string, string[]>());
  const [urls, setUrls] = useState<string[]>([]);
  const onDownload = (src: string) => {
    const url = src;
    const filename = Date.now() + ".png";

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(blobUrl);
        link.remove();
      });
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <div>简单的更新测试</div>
      <Button
        type="primary"
        className="mb-2"
        onClick={async () => {
          const imgs = await window.api.captureScreen();
          setUrls((r) => [...r, ...imgs]);
        }}
      >
        截图
      </Button>
      <div className="flex flex-wrap gap-2">
        {urls.map((item, index) => (
          <div className=" relative" key={item}>
            <Image key={item} src={item} width={200} />
            <Button
              onClick={() => onDownload(item)}
              className=" absolute bottom-0 right-0"
            >
              下载
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
