import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const ProfilePage: React.FC = () => {
  const router = useRouter();

  const handleNavigateToSetting = () => {
    router.push("/settings");  // 跳转到设置页面
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Manage your profile details here.</Text>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/profile")}>
          <Text style={styles.navText}>Go to Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleNavigateToSetting}>
          <Text style={styles.navText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Other profile details could go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1E567D",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  navbar: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  navItem: {
    backgroundColor: "#1E567D",
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProfilePage;
