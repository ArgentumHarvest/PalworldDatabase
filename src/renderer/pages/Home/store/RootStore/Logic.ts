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
  searchVal: string = "";
  indexList: number[] = [];
  showIndexSet: Set<number> = new Set();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeSearchVal(v?: string) {
    this.searchVal = v || "";
  }

  onClear() {
    this.searchVal = "";
    this.toSearch();
  }

  toSearch() {
    const words = this.searchVal.split(" ").filter((r) => !!r);
    let indexList: number[] = [];
    if (!words.length) {
      indexList = [...this.indexList];
      this.showIndexSet = new Set(indexList);
      return;
    }

    for (let pl of this.dataSource) {
      if (words.some((t) => !pl.searchText.includes(t))) {
        continue;
      }
      indexList.push(pl.index);
    }
    this.showIndexSet = new Set(indexList);
  }

  init() {
    const list: IPalRecord[] = [];
    const indexList: number[] = [];

    for (let p of plList) {
      indexList.push(p.index);
      let searchText = `${p.no} ${p.name}`;

      const attrs = p.attrs.map((r) => {
        searchText = `${searchText} ${r}`;
        return attrReversalObj[r].text as TAttr;
      });

      const lifeSkill = p.skills.map((r) => {
        searchText = `${searchText} ${r.type}${r.lv}`;
        return {
          type: lifeSkillReversalObj[r.type].text as TLifeSkill,
          lv: +r.lv,
        };
      });

      list.push({
        index: p.index,
        no: p.no,
        name: p.name,
        attrs,
        lifeSkill,
        searchText,
      });
    }

    this.dataSource = list;
    this.indexList = indexList;
    this.showIndexSet = new Set(indexList);
  }

  selectLabel(text: string) {
    const words = this.searchVal.split(" ");
    if (words.includes(text)) {
      this.searchVal = words.filter((i) => i !== text).join(" ");
      this.toSearch();
      return;
    }
    this.searchVal = `${this.searchVal} ${text}`;
    this.toSearch();
  }
}
