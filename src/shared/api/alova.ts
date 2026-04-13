import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import ReactHook from "alova/react";

export const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  statesHook: ReactHook,
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  id: "app",
});
