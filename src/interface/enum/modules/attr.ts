// 用户类型

import { configToTagObj, configToTagObjReversal } from "..";

// 原始定义
const config = {
  Neutral: { label: "无属性", color: "#b6948b", icon: "3" },
  Fire: { label: "火属性", color: "#d3552d", icon: "6" },
  Water: { label: "水属性", color: "#1671d3", icon: "5" },
  Electric: { label: "雷属性", color: "#c7b000", icon: "8" },
  Grass: { label: "草属性", color: "#5bb004", icon: "7" },
  Dark: { label: "暗属性", color: "#a40d46", icon: "4" },
  Dragon: { label: "龙属性", color: "#9e4dc3", icon: "9" },
  Ground: { label: "地属性", color: "#8d5627", icon: "2" },
  Ice: { label: "冰属性", color: "#18b2c0", icon: "1" },
} as const;

// 类型
export type TAttr = keyof typeof config;

// 标签展示数据源
export const attrObj = configToTagObj(config);

// 标签展示数据源
export const attrReversalObj = configToTagObjReversal(config);
