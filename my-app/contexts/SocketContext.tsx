import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const WS_URL = 'wss://vitalgaze-websocket-server.onrender.com';
const RECONNECT_DELAY = 300;

type EyeData = { x: number; y: number; w: number; h: number };
interface SocketContextType {
  isConnected: boolean;
  eyeData: EyeData | null;
  ledAngle: number;
  sendAICommand: (cmd: 'START_AI' | 'STOP_AI') => void;
  sendPayload: (payload: any) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wsRef = useRef<WebSocket | null>(null);
  // ← use ReturnType<typeof setTimeout> here
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [eyeData, setEyeData] = useState<EyeData | null>(null);
  const [ledAngle, setLedAngle] = useState(0);

  const connect = () => {
    // clean up old
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onclose = null;
      wsRef.current.onerror = null;
      wsRef.current.close();
    }

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      // clear pending reconnect
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
    };

    ws.onmessage = ev => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.x !== undefined && msg.y !== undefined) {
          setEyeData(msg);
        }
        if (msg.type === 'led_angle' && typeof msg.angle === 'number') {
          setLedAngle(msg.angle);
        }
      } catch {
        /** ignore **/
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY);
    };

    ws.onerror = () => {
      setIsConnected(false);
      ws.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      wsRef.current?.close();
    };
  }, []);

  const sendAICommand = (cmd: 'START_AI' | 'STOP_AI') => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(cmd);
    }
  };
  const sendPayload = (payload: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  return (
    <SocketContext.Provider
      value={{ isConnected, eyeData, ledAngle, sendAICommand, sendPayload }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within a SocketProvider');
  return ctx;
};
