import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDataContext } from "../../contexts/DataContext";

//const WS_URL = "ws://172.20.10.3:8080/ws"; // ✅ Change this to your ESP32 WebSocket URL
const WS_URL = "wss://vitalgaze-websocket-server.onrender.com";

const WifiScreen = () => {
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  // Get setEyeData globally
  const { eyeData, setEyeData } = useDataContext();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectInterval: any;
  
    const connectWebSocket = () => {
      ws = new WebSocket(WS_URL);
  
      ws.onopen = () => {
        console.log("🔌 WebSocket connect successfully！");
        setConnected(true);
        clearInterval(reconnectInterval);
      };
  
      ws.onmessage = (event) => {
        const raw = event.data;
      
        // 忽略非 JSON 消息（比如 "o"、"ping"）
        if (!raw || typeof raw !== 'string' || !raw.trim().startsWith('{')) {
          console.warn("⚠️ Skipped non-JSON message:", raw);
          return;
        }
      
        try {
          const data = JSON.parse(raw);
          console.log("✅ Received eye data:", data);
          setEyeData(data);
        } catch (err) {
          console.error("❌ JSON parse failed:", raw);
        }
      };
  
      ws.onerror = () => {
        setConnected(false);
        console.error("❌ WebSocket connected failed, try to reconnect...");
      };
  
      ws.onclose = () => {
        setConnected(false);
        console.warn("🔌 WebSocket connection is closed，try to reconnect...");
        // Attempt to reconnect after 3 seconds
        reconnectInterval = setInterval(connectWebSocket, 3000);
      };
    };
  
    connectWebSocket();
  
    return () => {
      ws?.close();
      clearInterval(reconnectInterval);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      <Text style={styles.header}>WebSocket Real-time Eye Data</Text>

      <View style={styles.statusContainer}>
        {connected ? (
          <Text style={styles.connectedText}>✅ Connect to ESP32 WebSocket!</Text>
        ) : (
          <Text style={styles.noDeviceText}>❌ Unconnected.</Text>
        )}
      </View>

      {eyeData ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>x: {eyeData.x}</Text>
          <Text style={styles.dataText}>y: {eyeData.y}</Text>
          <Text style={styles.dataText}>width: {eyeData.w}</Text>
          <Text style={styles.dataText}>height: {eyeData.h}</Text>
        </View>
      ) : (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#1E567D" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  header: {
    marginTop: 90,
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E567D",
    textAlign: "center",
  },
  statusContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  connectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  noDeviceText: {
    fontSize: 16,
    color: "#FF5252",
  },
  dataContainer: {
    marginTop: 40,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 2,
  },
  dataText: {
    fontSize: 18,
    color: "#1E567D",
    marginBottom: 10,
  },
});

export default WifiScreen;
