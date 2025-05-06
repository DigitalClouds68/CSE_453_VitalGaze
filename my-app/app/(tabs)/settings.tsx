import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDataContext } from "../../contexts/DataContext";

const WS_URL = "wss://vitalgaze-websocket-server.onrender.com";

const SettingsScreen = () => {
  const router = useRouter();
  const { eyeData, setEyeData } = useDataContext();
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectInterval: any;

    const connectWebSocket = () => {
      ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log("🔌 WebSocket connected successfully！");
        setConnected(true);
        clearInterval(reconnectInterval);
      };

      ws.onmessage = (event) => {
        const raw = event.data;
        if (!raw || typeof raw !== "string" || !raw.trim().startsWith("{")) return;

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
        console.error("❌ WebSocket error, reconnecting...");
      };

      ws.onclose = () => {
        setConnected(false);
        console.warn("🔌 WebSocket closed, reconnecting...");
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
      {/* 返回按钮 */}
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* 顶部图标与标题 */}
      <View style={styles.headerContainer}>
        <Image source={require("./image.png")} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* WebSocket 状态条 */}
      <View
        style={[
          styles.statusBanner,
          { backgroundColor: connected ? "#E6F9EE" : "#FDECEA" },
        ]}
      >
        <Ionicons
          name={connected ? "checkmark-circle" : "alert-circle"}
          size={22}
          color={connected ? "#2ECC71" : "#E74C3C"}
          style={{ marginRight: 10 }}
        />
        <Text style={styles.statusText}>
          WebSocket Status:{" "}
          <Text style={{ fontWeight: "bold", color: connected ? "green" : "red" }}>
            {connected ? "Connected" : "Disconnected"}
          </Text>
          {"\n"}
          {connected ? " Ready to get eye data!" : "Please connect your device."}
        </Text>
      </View>

      {/* 设置列表 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>General</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/settingsPage/bluetooth")}
        >
          <MaterialIcons name="bluetooth" size={24} color="#1E567D" />
          <Text style={styles.settingText}>Device Management (Bluetooth)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/settingsPage/wifi")}
        >
          <MaterialIcons name="wifi" size={24} color="#1E567D" />
          <Text style={styles.settingText}>Device Management (Wi-Fi)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/settingsPage/analysis")}
        >
          <MaterialIcons name="analytics" size={24} color="#1E567D" />
          <Text style={styles.settingText}>Data Analysis & Fitting</Text>
        </TouchableOpacity>
      </View>
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
    zIndex: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  headerIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E567D",
    marginTop: 10,
  },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 5,
    elevation: 2,
  },
  statusText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E567D",
  },
  sectionContainer: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  settingText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#1E567D",
  },
});

export default SettingsScreen;
