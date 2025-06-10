import { observer, useWhen } from "@mobx/index";
import { Provider, useStore } from "./store/RootStore";
import { List } from "./modules/List";
import { Search } from "./modules/Search";
import { EmptyRow } from "./modules/EmptyRow";
import { AttrRow } from "./modules/AttrRow";
import { LiftSkillRow } from "./modules/LiftSkillRow";

const Home = observer(function Home_() {
  const root = useStore();
  useWhen(
    () => true,
    () => {
      root.logic.init();
    }
  );

  return (
    <div className="max-h-[100vh] overflow-y-auto flex flex-wrap gap-4 p-4">
      <LiftSkillRow />
      <AttrRow />
      <Search />
      <List />
      <EmptyRow />
    </div>
  );
});

export default observer(function HomePage() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
});
