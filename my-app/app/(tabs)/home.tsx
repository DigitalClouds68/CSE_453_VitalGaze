import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState("Loading...");  // 默认状态为 "Loading..."
  const router = useRouter();

  // 获取JWT token并请求用户信息
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");  // 获取存储的token
        if (token) {
          const response = await fetch("http://192.168.1.217:5000/api/user/profile", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.user && data.user.username) {
            setUsername(data.user.username);  // 更新用户名
          } else {
            setUsername("Error: No username found");
          }
        } else {
          setUsername("Not logged in");  // 如果没有token，设置为未登录
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("Error fetching username");  // 错误时设置状态
      }
    };

    fetchUserData();
  }, []);  // 空数组作为依赖，只在组件首次渲染时请求数据

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: async () => {
        await AsyncStorage.removeItem("authToken");  // 删除token
        setUsername("Not logged in");  // 更新用户名为未登录
      }},
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
        <Icon name="menu" size={30} color="#1E567D" />
      </TouchableOpacity>

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

      <Text style={styles.welcomeText}>Welcome to VitalGaze</Text>
      <Text style={styles.personalizedGreeting}>Hello, {username}!</Text>  {/* 显示用户名 */}
      <Text style={styles.subtitle}>Track your eye health and progress</Text>

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
    zIndex: 10,
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
    zIndex: 20,
  },
  menuItem: {
    padding: 15,
    fontSize: 18,
    color: "#1E567D",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E567D",
    marginTop: 80,
    textAlign: 'center',
  },
  personalizedGreeting: {
    fontSize: 25,
    color: "#666",
    fontStyle: "italic",
    marginTop: 20,
    textAlign: 'center',
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
