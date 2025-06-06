import { HashRouter, Route, Routes } from "react-router";
import { IRouteItem, routes } from "./router/router-list";
import React from "react";
import Auth from "./router/auth";
import { observer, useWhen } from "@mobx/index";
import { useGlobal } from "@global/index";

export const loopRoute = (routes: IRouteItem[]) => {
  return routes.map((r) => {
    let children: React.ReactNode = undefined;
    if (r.children?.length) {
      children = loopRoute(r.children);
    }
    let element = r.element || null;
    if (!element && r.lazy) {
      element = (
        <Auth auth={r.auth || ""}>
          <r.lazy />
        </Auth>
      );
    }

    return (
      <Route
        path={r.path}
        key={r.path || r.key}
        element={element}
        index={(r.index || false) as false}
      >
        {children}
      </Route>
    );
  });
};

const App = observer(() => {
  const global = useGlobal();
  useWhen(
    () => true,
    () => {
      global.logic.init();
    }
  );

  return (
    <HashRouter>
      <Routes>{loopRoute(routes)}</Routes>
    </HashRouter>
  );
});

export default App;
