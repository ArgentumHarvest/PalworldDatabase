import { observer } from "@mobx/index";
import { useStore } from "../store/RootStore";
import { attrOptions } from "../../../../interface/enum/modules/attr";
import { PalAttrFull } from "@/components/PalAttr/PalAttrFull";

export const AttrRow = observer(function AttrRow_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="flex w-full gap-2 flex-wrap">
      {attrOptions.map((ar) => {
        return (
          <PalAttrFull
            type={ar.value}
            key={ar.value}
            onClick={() => {
              logic.selectLabel(ar.label);
            }}
          />
        );
      })}
    </div>
  );
});
