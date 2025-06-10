import Layout from "@/layout";
import { Page404 } from "@/pages/Page404";
import { JSX, lazy } from "react";

export interface IRouteItem {
  /** @param 路径 */
  path?: string;
  /** @param 没有路径时传入的唯一标识符 */
  key?: string;
  /** @param 组件 */
  lazy?: React.LazyExoticComponent<() => JSX.Element>;
  /** @param 组件 */
  element?: JSX.Element;
  /** @param 子路由 */
  children?: IRouteItem[];
  index?: boolean;
  auth?: string;
}

export const routes: IRouteItem[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        key: "home",
        lazy: lazy(() => import("@/pages/Home")),
      },
      {
        path: "data",
        lazy: lazy(() => import("@/pages/Data")),
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
];
