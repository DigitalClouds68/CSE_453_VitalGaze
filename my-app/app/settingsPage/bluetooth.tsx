// app/settingsPage/bluetooth.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import BackButton from "@/components/BackButton";
import SectionHeader from "@/components/SectionHeader";

type Device = {
  id: string;
  name: string;
};

const BluetoothScreen = () => {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
  const [searching, setSearching] = useState(false);

  const searchDevices = () => {
    setSearching(true);
    setTimeout(() => {
      setAvailableDevices([
        { id: "1", name: "VitalGaze-001" },
        { id: "2", name: "VitalGaze-002" },
      ]);
      setSearching(false);
    }, 2000);
  };

  const connectToDevice = (device: Device) => {
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
      <BackButton />
      <SectionHeader title="Bluetooth" />

      {/* 🚧 开发中提示 */}
      <View style={styles.noticeBanner}>
        <Text style={styles.noticeText}>🚧 Some Bluetooth features are still under development.</Text>
      </View>

      <View style={styles.statusContainer}>
        {deviceConnected ? (
          <View style={styles.connectedBox}>
            <MaterialIcons name="bluetooth-connected" size={24} color="#4CAF50" />
            <Text style={styles.connectedText}>Connected to {connectedDevice}</Text>
            <TouchableOpacity onPress={disconnectDevice} style={styles.disconnectButton}>
              <Text style={styles.disconnectText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noDeviceText}>No Device Connected</Text>
        )}
      </View>

      {!deviceConnected && (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={searchDevices}
          disabled={searching}
        >
          {searching ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.searchButtonText}>Search Devices</Text>
          )}
        </TouchableOpacity>
      )}

      {availableDevices.length > 0 && (
        <View style={styles.deviceList}>
          <Text style={styles.deviceListTitle}>Available Devices</Text>
          {availableDevices.map((device) => (
            <TouchableOpacity
              key={device.id}
              style={styles.deviceItem}
              onPress={() => connectToDevice(device)}
            >
              <MaterialIcons name="bluetooth-searching" size={20} color="#1E567D" />
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
  noticeBanner: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#FFF3CD",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FFEeba",
  },
  noticeText: {
    fontSize: 14,
    color: "#856404",
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

export default BluetoothScreen;
