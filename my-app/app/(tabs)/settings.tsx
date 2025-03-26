import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 返回按钮 */}
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* 头部图标和标题 */}
      <View style={styles.headerContainer}>
        <Image source={require("./image.png")} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* 设置项列表 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>General</Text>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push("/settings/bluetooth")}> {/* 👈 蓝牙连接页 */}
          <MaterialIcons name="bluetooth" size={24} color="#1E567D" />
          <Text style={styles.settingText}>Device Management (Bluetooth)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push("/settings/wifi")}> {/* 👈 新增 WiFi 设置项 */}
          <MaterialIcons name="wifi" size={24} color="#1E567D" />
          <Text style={styles.settingText}>Device Management (Wi-Fi)</Text>
        </TouchableOpacity>

        {/* 你可以在这里继续添加更多设置项 */}
      </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E567D",
    marginTop: 10
  },
  sectionContainer: {
    marginTop: 40
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 10
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2
  },
  settingText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#1E567D"
  }
});

export default SettingsScreen;
