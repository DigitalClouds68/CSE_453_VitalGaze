import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Device = {
  id: string;
  name: string;
};

const SettingsScreen = () => {
  const router = useRouter();
  const [deviceConnected, setDeviceConnected] = useState<boolean>(false);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
  const [searching, setSearching] = useState<boolean>(false);

  const searchDevices = () => {
    setSearching(true);
    setTimeout(() => {
      setAvailableDevices([
        { id: "1", name: "VitalGaze-001" },
        { id: "2", name: "VitalGaze-002" }
      ]);
      setSearching(false);
    }, 2000);
  };

  const connectToDevice = (device: Device): void => {
    setDeviceConnected(true);
    setConnectedDevice(device.name);
    setAvailableDevices([]);
  };

  const disconnectDevice = () => {
    setDeviceConnected(false);
    setConnectedDevice(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 返回 Homepage 按钮 */}
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* 头部图标 */}
      <View style={styles.headerContainer}>
        <Image source={require("./image.png")} style={styles.headerIcon} />
      </View>

      {/* 已连接设备显示 */}
      <View style={styles.deviceStatusContainer}>
        {deviceConnected ? (
          <View style={styles.connectedBox}>
            <MaterialIcons name="bluetooth-connected" size={24} color="#4CAF50" />
            <Text style={styles.connectedText}>Connected to {connectedDevice}</Text>
            <TouchableOpacity style={styles.disconnectButton} onPress={disconnectDevice}>
              <Text style={styles.disconnectText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noDeviceText}>No Device Connected</Text>
        )}
      </View>

      {/* 搜索设备按钮 */}
      {!deviceConnected && (
        <TouchableOpacity style={styles.searchButton} onPress={searchDevices} disabled={searching}>
          {searching ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.searchButtonText}>Search Devices</Text>
          )}
        </TouchableOpacity>
      )}

      {/* 可连接设备列表 */}
      {availableDevices.length > 0 && (
        <View style={styles.deviceListContainer}>
          <Text style={styles.deviceListLabel}>Available Devices</Text>
          {availableDevices.map((device) => (
            <TouchableOpacity key={device.id} style={styles.deviceItem} onPress={() => connectToDevice(device)}>
              <MaterialIcons name="bluetooth-searching" size={20} color="#007AFF" />
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
    backgroundColor: "#F5F5F5"
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 80
  },
  headerIcon: {
  
    width: 60,
    height: 60,
    resizeMode: "contain"
  },
  deviceStatusContainer: {
    marginTop: 30,
    alignItems: "center"
  },
  connectedBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 10
  },
  connectedText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50"
  },
  disconnectButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#FF5252",
    borderRadius: 5
  },
  disconnectText: {
    color: "white",
    fontSize: 14
  },
  noDeviceText: {
    fontSize: 16,
    color: "#9E9E9E"
  },
  searchButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center"
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  deviceListContainer: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  deviceListLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E3F2FD",
    marginBottom: 10,
    borderRadius: 5
  },
  deviceName: {
    marginLeft: 10,
    fontSize: 16
  }
});

export default SettingsScreen;
