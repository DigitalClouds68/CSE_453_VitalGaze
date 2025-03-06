import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons"; 

const SettingsPage = () => {
  const router = useRouter();
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState('');
  const [availableDevices, setAvailableDevices] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);

  // 模拟搜索设备
  const searchDevices = () => {
    setSearching(true);
    setTimeout(() => {
      setAvailableDevices(['VitalGaze 101', 'VitalGaze 202', 'VitalGaze 303']);
      setSearching(false);
    }, 2000);
  };

  // 连接设备
  const connectToDevice = (deviceName: string) => {
    setDeviceConnected(true);
    setConnectedDevice(deviceName);
    setAvailableDevices([]); // 清空搜索列表
  };

  // 断开连接 - 需要确认
  const disconnectDevice = () => {
    Alert.alert(
      "Disconnect Device",
      `Are you sure you want to disconnect ${connectedDevice}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Disconnect", onPress: () => {
            setDeviceConnected(false);
            setConnectedDevice('');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 顶部返回按钮 */}
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* 设置图标 */}
      <View style={styles.headerContainer}>
        <Image source={require('./image.png')} style={styles.headerIcon} />
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
          {availableDevices.map((device, index) => (
            <TouchableOpacity key={index} style={styles.deviceItem} onPress={() => connectToDevice(device)}>
              <MaterialIcons name="bluetooth-searching" size={20} color="#007AFF" />
              <Text style={styles.deviceName}>{device}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

// **样式优化**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  headerIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  deviceStatusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  connectedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  connectedText: {
    fontSize: 16,
    color: '#2E7D32',
  },
  disconnectButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  disconnectText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noDeviceText: {
    fontSize: 16,
    color: '#757575',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceListContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deviceListLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 5,
    marginVertical: 5,
  },
  deviceName: {
    fontSize: 16,
    color: '#0277BD',
    marginLeft: 10,
  },
});

export default SettingsPage;
