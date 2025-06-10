import { makeAutoObservable } from "@mobx/index";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import plList from "../pl_list.json";
import { IPalRecord } from "../../../../../interface";
import {
  attrReversalObj,
  TAttr,
} from "../../../../../interface/enum/modules/attr";
import {
  lifeSkillReversalObj,
  TLifeSkill,
} from "../../../../../interface/enum/modules/lifeSkill";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IPalRecord[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    const list: IPalRecord[] = [];

    for (let p of plList) {
      list.push({
        index: p.index,
        no: p.no,
        name: p.name,
        attrs: p.attrs.map((r) => attrReversalObj[r].text as TAttr),
        lifeSkill: p.skills.map((r) => {
          return {
            type: lifeSkillReversalObj[r.type].text as TLifeSkill,
            lv: +r.lv,
          };
        }),
      });
    }

    this.dataSource = list;
  }
}
