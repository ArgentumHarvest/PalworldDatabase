import { observer } from "@mobx/index";
import { useStore } from "../store/RootStore";
import { lifeSkillOptions } from "../../../../interface/enum/modules/lifeSkill";
import { PalLifeText } from "@/components/PalLifeSkill/PalLifeText";

export const LiftSkillRow = observer(function LiftSkillRow_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="flex w-full gap-2 flex-wrap">
      {lifeSkillOptions.map((r) => {
        return (
          <PalLifeText
            record={r}
            key={r.value}
            onClick={() => {
              logic.selectLabel(r.label);
            }}
          />
        );
      })}
    </div>
  );
});
