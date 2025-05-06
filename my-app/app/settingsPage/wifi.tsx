import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDataContext } from "../../contexts/DataContext";

const WS_URL = "wss://vitalgaze-websocket-server.onrender.com";

const WifiScreen = () => {
  const router = useRouter();
  const [connected, setConnected] = useState(false);
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
        console.warn("🔌 WebSocket connection closed，reconnecting...");
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1E567D" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Wi-Fi Mode</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.statusContainer}>
          {connected ? (
            <Text style={styles.connectedText}>✅ Connected to ESP32 WebSocket!</Text>
          ) : (
            <Text style={styles.noDeviceText}>❌ Not Connected.</Text>
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
          <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#1E567D" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 0,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E567D",
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 10,
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
