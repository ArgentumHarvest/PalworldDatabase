import { observer, useWhen } from "@mobx/index";
import { Provider, useStore } from "./store/RootStore";
import { PalImage } from "@/components/PalImage";
import { PalAttr } from "@/components/PalAttr";
import { PalLifeSkill } from "@/components/PalLifeSkill";

interface IHomeProps {}

const Home = observer(function Home_(props: IHomeProps) {
  const root = useStore();
  useWhen(
    () => true,
    () => {
      root.logic.init();
    }
  );

  return (
    <div className="max-h-[100vh] overflow-y-auto flex flex-wrap gap-4 p-4">
      {root.logic.dataSource.map((p) => {
        return (
          <div
            key={p.index}
            className="w-[calc(25vw-36px)] min-w-[360px] text-sm flex bg-[var(--bg-d-mask-5)] rounded-[32px]"
          >
            <PalImage index={p.index} className="rounded-[32px] border-2" />
            <div className="p-1">
              <div className="flex gap-1">
                <span>{p.no}</span>
                <span>{p.name}</span>
                {p.attrs.map((a) => {
                  return <PalAttr key={a} type={a} />;
                })}
              </div>
              <div className="flex flex-wrap gap-1">
                {p.lifeSkill.map((r) => {
                  return <PalLifeSkill record={r} key={r.type} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default observer(function HomePage(props: IHomeProps) {
  return (
    <Provider>
      <Home {...props} />
    </Provider>
  );
});
