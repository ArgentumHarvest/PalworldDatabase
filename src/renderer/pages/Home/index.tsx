import { Button } from "antd";
import { useState } from "react";

export const Page = function Page_() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <Button
        onClick={() => {
          setCount((d) => d + 1);
        }}
      >
        +1
      </Button>
    </div>
  );
};

export default Page;
