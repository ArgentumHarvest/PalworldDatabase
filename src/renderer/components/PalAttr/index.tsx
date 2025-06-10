import { attrObj, TAttr } from "../../../interface/enum/modules/attr";
import "./index.css";

export interface IPalAttrProps {
  type: TAttr;
  className?: string;
}

export const PalAttr = function PalAttr_(props: IPalAttrProps) {
  const { type, className = "" } = props;

  const info = attrObj[type];

  if (!info) {
    return "-";
  }

  const imageName = "./img/pl/attr.png";

  const rIndex = +(info.icon || 0) - 1;

  let left = rIndex * 24;

  return (
    <div
      className={`c-pal-attr ${className}`}
      style={{
        backgroundImage: `url(${imageName})`,
        backgroundPositionX: `-${left}px`,
      }}
    ></div>
  );
};
