import { IOption } from "../../../interface";
import {
  lifeSkillObj,
  TLifeSkill,
} from "../../../interface/enum/modules/lifeSkill";

import "./index.css";

export interface IPalLifeTextProps {
  record: IOption;
  className?: string;
  onClick?: () => void;
}

export const PalLifeText = function PalLifeText_(props: IPalLifeTextProps) {
  const { record, className = "", onClick } = props;

  const info = lifeSkillObj[record.value as TLifeSkill];

  if (!info) {
    return "-";
  }

  const imageName = "./img/pl/skill.png";

  const rIndex = +(info.icon || 0) - 1;

  let left = (rIndex % 10) * 20;
  let top = Math.floor(rIndex / 10) * 20;

  return (
    <div
      className={`c-pal-life-skill bg-[var(--bg)] !p-[2px] text-sm ${className}`}
      onClick={onClick}
    >
      <div
        className="icon"
        style={{
          backgroundImage: `url(${imageName})`,
          backgroundPositionX: `-${left}px`,
          backgroundPositionY: `-${top}px`,
        }}
      ></div>
      {record.label}
    </div>
  );
};
