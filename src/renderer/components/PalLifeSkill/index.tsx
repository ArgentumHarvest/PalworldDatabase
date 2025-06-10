import { Tooltip } from "antd";
import { ILifeSkillRecord } from "../../../interface";
import { lifeSkillObj } from "../../../interface/enum/modules/lifeSkill";

import "./index.css";

export interface IPalLifeSkillProps {
  record: ILifeSkillRecord;
  className?: string;
}

export const PalLifeSkill = function PalLifeSkill_(props: IPalLifeSkillProps) {
  const { record, className = "" } = props;

  const info = lifeSkillObj[record.type];

  if (!info) {
    return "-";
  }

  const imageName = "./img/pl/skill.png";

  const rIndex = +(info.icon || 0) - 1;

  let left = (rIndex % 10) * 20;
  let top = Math.floor(rIndex / 10) * 20;

  return (
    <Tooltip title={info.text}>
      <div className={`c-pal-life-skill ${className}`}>
        <div
          className="icon"
          style={{
            backgroundImage: `url(${imageName})`,
            backgroundPositionX: `-${left}px`,
            backgroundPositionY: `-${top}px`,
          }}
        ></div>
        {record.lv}
      </div>
    </Tooltip>
  );
};
