import { useContext } from "react";
import { rootContext } from "../contexts/contextProvider";

export const useRootContext = () => {
  const context = useContext(rootContext);
  if (context === undefined) {
    throw new Error('useRootContext must be used within a RootContextProvider');
  }
  return context;
};