import { observer } from "@mobx/index";
import { useStore } from "../store/RootStore";
import { PalImage } from "@/components/PalImage";
import { PalAttr } from "@/components/PalAttr";
import { PalLifeSkill } from "@/components/PalLifeSkill";
import { IPalRecord } from "../../../../interface";
import { classNames } from "@/utils/tool";

export const PalRecord = observer(function PalRecord_(props: {
  record: IPalRecord;
}) {
  const root = useStore();
  const { logic } = root;
  const { record } = props;

  return (
    <div
      className={classNames({
        "w-[calc(25vw-36px)] min-w-[360px] text-sm flex bg-[var(--bg-d-mask-5)] rounded-[32px]":
          true,
        hidden: !logic.showIndexSet.has(record.index),
      })}
    >
      <PalImage index={record.index} className="rounded-[32px] border-2" />
      <div className="p-1">
        <div className="flex gap-1">
          <span>{record.no}</span>
          <span>{record.name}</span>
          {record.attrs.map((a) => {
            return <PalAttr key={a} type={a} />;
          })}
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {record.lifeSkill.map((r) => {
            return <PalLifeSkill record={r} key={r.type} />;
          })}
        </div>
      </div>
    </div>
  );
});
