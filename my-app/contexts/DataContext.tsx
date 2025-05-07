import React, { createContext, useContext, useState, useEffect } from "react";

type EyeData = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type UnityCoords = {
  world: { x: number; y: number; z: number };
  screen: { x: number; y: number };
};

type DataContextProps = {
  eyeData: EyeData | null;
  unityCoords: UnityCoords;
  ledAngle: number;
  setUnityCoords: React.Dispatch<React.SetStateAction<UnityCoords>>;
  setEyeData: React.Dispatch<React.SetStateAction<EyeData | null>>;
  setLedAngle: React.Dispatch<React.SetStateAction<number>>;
};

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eyeData, setEyeData] = useState<EyeData | null>(null);
  const [unityCoords, setUnityCoords] = useState<UnityCoords>({ world: { x: 0, y: 0, z: 0 }, screen: { x: 0, y: 0 } });
  const [ledAngle, setLedAngle] = useState<number>(0); // 👈 新增 LED 角度状态

  return (
    <DataContext.Provider value={{ eyeData, setEyeData, unityCoords, setUnityCoords, ledAngle, setLedAngle }}>
      {children}
    </DataContext.Provider>
  );
};

// hook that can be customized to use the context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
