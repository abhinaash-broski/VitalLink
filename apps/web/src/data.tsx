import { VitalLinkClient } from "@vitallink/api";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// No VITE_API_URL → mock mode (design data). Set it to point at the FastAPI backend.
const ApiContext = createContext<VitalLinkClient>(new VitalLinkClient());

export function ApiProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new VitalLinkClient({
        baseUrl: import.meta.env.VITE_API_URL || undefined,
        getToken: async () => sessionStorage.getItem("vl.token"),
      }),
  );
  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
}

export type Loadable<T> = { status: "loading" } | { status: "error"; error: Error } | { status: "ready"; data: T };

export function useScreen<T>(load: (api: VitalLinkClient) => Promise<T>): Loadable<T> {
  const api = useContext(ApiContext);
  const [state, setState] = useState<Loadable<T>>({ status: "loading" });
  useEffect(() => {
    let live = true;
    load(api).then(
      (data) => live && setState({ status: "ready", data }),
      (error: Error) => live && setState({ status: "error", error }),
    );
    return () => {
      live = false;
    };
  }, [api, load]);
  return state;
}
