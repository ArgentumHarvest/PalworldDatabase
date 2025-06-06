import { IPreloadApi } from "../main/interface";

declare global {
  interface Window {
    api: IPreloadApi;
  }
}
