import React, { useState } from "react";
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

type WifiDevice = {
  id: string;
  name: string;
};

const WifiScreen = () => {
  const router = useRouter();
  const [devices, setDevices] = useState<WifiDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<WifiDevice | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const searchForDevices = () => {
    setIsSearching(true);
    setTimeout(() => {
      setDevices([
        { id: "wifi-1", name: "VitalGaze-AP" },
        { id: "wifi-2", name: "ESP32-GAZE" },
      ]);
      setIsSearching(false);
    }, 2000);
  };

  const connectToDevice = (device: WifiDevice) => {
    setConnectedDevice(device);
    setDevices([]);
  };

  const disconnectDevice = () => {
    setConnectedDevice(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 返回按钮 */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* 页面标题 */}
      <Text style={styles.header}>Wi-Fi Device Management</Text>

      {/* 当前连接状态 */}
      <View style={styles.statusContainer}>
        {connectedDevice ? (
          <View style={styles.connectedBox}>
            <MaterialIcons name="wifi" size={24} color="#4CAF50" />
            <Text style={styles.connectedText}>Connected to {connectedDevice.name}</Text>
            <TouchableOpacity onPress={disconnectDevice} style={styles.disconnectButton}>
              <Text style={styles.disconnectText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noDeviceText}>No device connected</Text>
        )}
      </View>

      {/* 搜索按钮 */}
      {!connectedDevice && (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={searchForDevices}
          disabled={isSearching}
        >
          {isSearching ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.searchButtonText}>Search Devices</Text>
          )}
        </TouchableOpacity>
      )}

      {/* 可用设备列表 */}
      {devices.length > 0 && (
        <View style={styles.deviceList}>
          <Text style={styles.deviceListTitle}>Available Devices</Text>
          {devices.map((device) => (
            <TouchableOpacity
              key={device.id}
              style={styles.deviceItem}
              onPress={() => connectToDevice(device)}
            >
              <MaterialIcons name="wifi" size={20} color="#1E567D" />
              <Text style={styles.deviceName}>{device.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  connectedBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 10,
  },
  connectedText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  disconnectButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#FF5252",
    borderRadius: 5,
  },
  disconnectText: {
    color: "white",
    fontSize: 14,
  },
  noDeviceText: {
    fontSize: 16,
    color: "#9E9E9E",
  },
  searchButton: {
    marginTop: 20,
    backgroundColor: "#1E567D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  deviceList: {
    marginTop: 30,
  },
  deviceListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#888",
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  deviceName: {
    marginLeft: 10,
    fontSize: 16,
    color: "#1E567D",
  },
});

export default WifiScreen;
