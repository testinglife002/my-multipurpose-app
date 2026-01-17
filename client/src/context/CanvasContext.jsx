// ✅ src/context/CanvasContext.jsx
/*
import { createContext, useContext } from "react";

export const CanvasContext = createContext(null);

export const useCanvasHook = () => {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error("CanvasContext not found");
  return ctx;
};
*/

import React, { createContext } from 'react'
import { useContext } from 'react';

export const CanvasContext =createContext();




export const useCanvasHook = () => {
  const context = useContext(CanvasContext);
  if(!context) throw new Error("Error")
    return context;
}



