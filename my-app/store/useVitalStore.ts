// stores/useVitalStore.ts
import { create } from 'zustand';

type GazePoint = {
  x: number;
  y: number;
  timestamp: number;
};

type VitalStore = {
  gaze: GazePoint | null;
  gazeHistory: GazePoint[];
  updateGaze: (gaze: { x: number; y: number }) => void;
};

export const useVitalStore = create<VitalStore>((set, get) => ({
  gaze: null,
  gazeHistory: [],
  updateGaze: ({ x, y }) => {
    const timestamp = Date.now();
    const newPoint = { x, y, timestamp };
    set((state) => ({
      gaze: newPoint,
      gazeHistory: [...state.gazeHistory.slice(-99), newPoint], // 最多保存100条
    }));
  },
}));
