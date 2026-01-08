// ✅ src/context/CanvasContext.jsx
import { createContext, useContext } from "react";

export const CanvasContext = createContext(null);

export const useCanvasHook = () => {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error("CanvasContext not found");
  return ctx;
};
