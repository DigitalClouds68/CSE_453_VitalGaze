import React, { createContext, useContext, useEffect, useState, useRef } from "react";

// WebSocket 服务器地址（与你 Render 上保持一致）
const WS_URL = "wss://vitalgaze-websocket-server.onrender.com";

// 创建上下文类型
type AIControlContextType = {
  aiEnabled: boolean;
  setAIEnabled: (enabled: boolean) => void;
  isConnected: boolean;
};

const AIControlContext = createContext<AIControlContextType | undefined>(undefined);

// 提供者组件
export const AIControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiEnabled, setAIEnabledState] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // 初始化 WebSocket
  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    globalThis.esp32Socket = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket connected (AIControlContext)");
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.warn("❌ WebSocket disconnected (AIControlContext)");
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error (AIControlContext)", err);
    };

    return () => {
      ws.close();
    };
  }, []);

  // 外部控制的 set 函数（只在值变时发送指令）
  const setAIEnabled = (enabled: boolean) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const command = enabled ? "START_AI" : "STOP_AI";
      wsRef.current.send(command);
      console.log("📤 Sent to ESP32:", command);
    } else {
      console.warn("❌ Cannot send, WebSocket not open");
    }
    setAIEnabledState(enabled);
  };

  return (
    <AIControlContext.Provider value={{ aiEnabled, setAIEnabled, isConnected }}>
      {children}
    </AIControlContext.Provider>
  );
};

// hook
export const useAIControl = () => {
  const context = useContext(AIControlContext);
  if (!context) {
    throw new Error("useAIControl must be used within an AIControlProvider");
  }
  return context;
};
