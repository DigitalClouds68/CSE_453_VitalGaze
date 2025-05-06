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
  eyeData: EyeData | null;       // From ESP32
  unityCoords: UnityCoords;      // From Unity WebGL
  setUnityCoords: React.Dispatch<React.SetStateAction<UnityCoords>>;
  setEyeData: React.Dispatch<React.SetStateAction<EyeData | null>>;
};

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store ESP32 eye data in global state
  const [eyeData, setEyeData] = useState<EyeData | null>(null);

  // Store Unity coordinates in global state
  const [unityCoords, setUnityCoords] = useState<UnityCoords>({
    world: { x: 0, y: 0, z: 0 },
    screen: { x: 0, y: 0 },
  });

  return (
    <DataContext.Provider value={{ eyeData, setEyeData, unityCoords, setUnityCoords }}>
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
