import { Button } from "antd";

export const Page = function Page_() {
  return (
    <div>
      <Button
        onClick={() => {
          console.log(777);
          window.api.send("RESIZE_WINDOW", {
            data: {
              small: true,
            },
          });
        }}
      >
        试一试
      </Button>
    </div>
  );
};

export default Page;
