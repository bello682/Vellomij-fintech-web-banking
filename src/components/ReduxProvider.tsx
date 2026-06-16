"use client"; // Required for Redux

import { Provider } from "react-redux";
import store from "../app/store/auth/store"; // Point to your moved store

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
