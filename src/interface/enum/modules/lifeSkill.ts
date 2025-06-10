// 用户类型

import { configToOption, configToTagObj, configToTagObjReversal } from "..";

// 原始定义
const config = {
  Kindling: { label: "生火", color: "#c66850", icon: "10" },
  Watering: { label: "浇水", color: "#16f5fe", icon: "8" },
  Planting: { label: "播种", color: "#9be81a", icon: "7" },
  GeneratingElectricity: { label: "发电", color: "#fedd02", icon: "4" },
  Handiwork: { label: "手工作业", color: "#fee5a0", icon: "5" },
  Gathering: { label: "采集", color: "#1cda6f", icon: "12" },
  Lumbering: { label: "伐木", color: "#cb812e", icon: "1" },
  Mining: { label: "采矿", color: "#8ea8d4", icon: "11" },
  MedicineProduction: { label: "制药", color: "#b1c660", icon: "3" },
  Cooling: { label: "冷却", color: "#88f4f6", icon: "2" },
  Transporting: { label: "搬运", color: "#dca167", icon: "6" },
  Farming: { label: "牧场", color: "#fdbc8a", icon: "9" },
} as const;

// 类型
export type TLifeSkill = keyof typeof config;

export const lifeSkillOptions = configToOption(config);

// 标签展示数据源
export const lifeSkillObj = configToTagObj(config);

// 标签展示数据源
export const lifeSkillReversalObj = configToTagObjReversal(config);
