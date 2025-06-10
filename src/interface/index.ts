import { TAttr } from "./enum/modules/attr";
import { TLifeSkill } from "./enum/modules/lifeSkill";

export type TResizeType =
  /** @param 最小化 */
  | "minimize"
  /** @param 取消最大化 */
  | "unmaximize"
  /** @param 最大化 */
  | "maximize";

/** @interface 视图tab定义 */
export interface IVewTab {
  id: string;
  title: string;
  isActive: boolean;
  /** @param 是否可以关闭 */
  closeable: boolean;
}

/** @interface 标签项的定义 */
export interface ITagRecord {
  color: string;
  text: string;
  icon?: string;
}

/** @interface 关于帕鲁的定义 */
export interface IPalRecord {
  /** @param 用于计算头像 */
  index: number;
  /** @param 图鉴编号 */
  no: string;
  /** @param 帕鲁名称 */
  name: string;
  /** @param 属性 */
  attrs: TAttr[];
  /** @param 生活技能 */
  lifeSkill: ILifeSkillRecord[];
}

/** @interface 生活技能 */
export interface ILifeSkillRecord {
  /** @param 技能类型 */
  type: TLifeSkill;
  /** @param 技能等级 */
  lv: number;
}
