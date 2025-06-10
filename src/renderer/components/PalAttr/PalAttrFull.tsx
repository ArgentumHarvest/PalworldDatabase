import { attrObj, TAttr } from "../../../interface/enum/modules/attr";
import "./index.css";

export interface IPalAttrProps {
  type: TAttr;
  className?: string;
  onClick?: () => void;
}

export const PalAttrFull = function PalAttrFull_(props: IPalAttrProps) {
  const { type, className = "", onClick } = props;

  const info = attrObj[type];

  if (!info) {
    return "-";
  }

  const imageName = "./img/pl/attr.png";

  const rIndex = +(info.icon || 0) - 1;

  let left = rIndex * 24;

  return (
    <div
      className="flex border-[1px] p-[2px] rounded-sm text-sm items-center cursor-pointer bg-[var(--bg)]"
      onClick={onClick}
    >
      <div
        className={`c-pal-attr ${className}`}
        style={{
          backgroundImage: `url(${imageName})`,
          backgroundPositionX: `-${left}px`,
        }}
      ></div>
      {info.text}
    </div>
  );
};
