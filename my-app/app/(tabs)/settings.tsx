import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDataContext } from "@/contexts/DataContext";
import { useSocket } from "@/contexts/SocketContext"; // 👈 新增

const SettingsScreen = () => {
  const router = useRouter();
  const { eyeData } = useDataContext();
  const { isConnected } = useSocket(); // 👈 使用共享 WebSocket 状态

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Image source={require("./image.png")} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={[styles.statusBanner, { backgroundColor: isConnected ? "#E6F9EE" : "#FDECEA" }]}>
        <Ionicons
          name={isConnected ? "checkmark-circle" : "alert-circle"}
          size={22}
          color={isConnected ? "#2ECC71" : "#E74C3C"}
          style={{ marginRight: 10 }}
        />
        <Text style={styles.statusText}>
          WebSocket Status:{" "}
          <Text style={{ fontWeight: "bold", color: isConnected ? "green" : "red" }}>
            {isConnected ? "Connected!!! Ready to get eye data!!!" : "Disconnected!!! Please check your connection!!!"}
          </Text>
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>General</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/settingsPage/bluetooth")}
        >
          <MaterialIcons name="bluetooth" size={24} color="#1E567D" />
          <Text style={styles.settingText}>Bluetooth Management</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/settingsPage/wifi")}
        >
          <MaterialIcons name="wifi" size={24} color="#1E567D" />
          <Text style={styles.settingText}>Wi-Fi Management</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push("/settingsPage/analysis")}
        >
          <MaterialIcons name="analytics" size={24} color="#1E567D" />
          <Text style={styles.settingText}>Data Fitting Condition</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#F5F5F5" },
  backButton: { position: "absolute", top: 40, left: 20, zIndex: 10 },
  headerContainer: { alignItems: "center", marginTop: 80 },
  headerIcon: { width: 60, height: 60, resizeMode: "contain" },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1E567D", marginTop: 10 },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 5,
    elevation: 2,
  },
  statusText: { fontSize: 15, fontWeight: "600", color: "#1E567D" },
  sectionContainer: { marginTop: 40 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#888", marginBottom: 10 },
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
  settingText: { marginLeft: 12, fontSize: 16, color: "#1E567D" },
});

export default SettingsScreen;
