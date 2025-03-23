import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';  // 使用 Next.js 的 router

const HomePage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();  // 使用 router 来进行页面跳转
  const username = "John Doe"; // 假设从登录后的用户信息中获取

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: () => console.log("Signed out") },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 汉堡菜单按钮 */}
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
        <Icon name="menu" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* 菜单 */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Text style={styles.menuItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Text style={styles.menuItem}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={styles.menuItem}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 欢迎标语 */}
      <Text style={styles.welcomeText}>Welcome to VitalGaze</Text>

      {/* 个性化问候文本，放置在中间 */}
      <Text style={styles.personalizedGreeting}>Hello, {username}!</Text>

      {/* 副标题 */}
      <Text style={styles.subtitle}>Track your eye health and progress</Text>

      {/* 信息卡片 */}
      <View style={styles.card}>
        <Text>Your Progress</Text>
        <Text>Eye relaxation exercises completed: 20</Text>
        <Text>Last training session: 10 mins ago</Text>
      </View>

      <View style={styles.card}>
        <Text>Upcoming Sessions</Text>
        <Text>Next session: 3 PM</Text>
        <Text>Duration: 15 mins</Text>
      </View>

      {/* 按钮区域 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/training")}>
          <Text style={styles.buttonText}>Start Training</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  menuButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,  // 保证按钮在最上层
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    padding: 10,
    zIndex: 20,  // 设置更高的 zIndex 确保菜单框在最上层
  },
  menuItem: {
    padding: 15,
    fontSize: 18,  // 增大字体大小
    color: "#1E567D",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E567D",
    marginTop: 80,
    textAlign: 'center',  // 居中对齐
  },
  personalizedGreeting: {
    fontSize: 25,
    color: "#666",
    fontStyle: "italic",
    marginTop: 20,
    textAlign: 'center',  // 居中对齐
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
    marginTop: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 20,
    width: "100%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1E567D",
    padding: 15,
    marginVertical: 10,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default HomePage;
