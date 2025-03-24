import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [lastSession, setLastSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 获取用户信息
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.log("No auth token found, redirecting to signin");
          router.push('/(tabs)/signin');
          return;
        }
        
        const response = await fetch("http://192.168.1.217:5000/api/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.user.username) {
            setUsername(data.user.username);
            // 可选：保存用户名到AsyncStorage以便离线使用
            await AsyncStorage.setItem("username", data.user.username);
          } else {
            console.log("Invalid user data received");
            router.push('/(tabs)/signin');
          }
        } else {
          console.log("Failed to fetch user profile, status:", response.status);
          // 如果获取用户资料失败，可能是token过期
          if (response.status === 401) {
            await handleTokenExpired();
          } else {
            Alert.alert("Error", "Failed to fetch user information.");
            router.push('/(tabs)/signin');
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Network Error", "Unable to connect to the server.");
        
        // 尝试从本地存储获取用户名作为后备方案
        try {
          const localUsername = await AsyncStorage.getItem("username");
          if (localUsername) {
            setUsername(localUsername);
          } else {
            router.push('/(tabs)/signin');
          }
        } catch (storageError) {
          console.error("Error reading from storage:", storageError);
          router.push('/(tabs)/signin');
        }
      } finally {
        setIsLoading(false);
      }
    };

    // 获取上次训练数据
    const fetchLastSession = async () => {
      try {
        const lastSessionData = await AsyncStorage.getItem("lastTrainingSession");
        if (lastSessionData) {
          setLastSession(JSON.parse(lastSessionData));
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchUserData();
    fetchLastSession();
  }, []);

  // 处理Token过期情况
  const handleTokenExpired = async () => {
    await clearAllUserData();
    Alert.alert(
      "Session Expired",
      "Your session has expired. Please sign in again.",
      [{ text: "OK", onPress: () => router.push('/(tabs)/signin') }]
    );
  };

  // 清除所有用户相关数据
  const clearAllUserData = async () => {
    try {
      // 创建一个包含所有需要删除的键的数组
      const keysToRemove = [
        "authToken", 
        "userData",
        "userPreferences",
        "lastTrainingSession",
        "username"
        // 添加其他需要在登出时清除的数据
      ];
      
      // 一次性删除所有键
      await AsyncStorage.multiRemove(keysToRemove);
      
      // 清除内存中的状态
      setUsername("");
      setLastSession(null);
      
      console.log("All user data cleared successfully");
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  // 增强的登出处理
  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out", 
      "Are you sure you want to sign out?", 
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("authToken");
              
              // 尝试在服务器端也使token失效（如果API支持）
              if (token) {
                try {
                  await fetch("http://192.168.1.217:5000/api/auth/logout", {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${token}`,
                      "Content-Type": "application/json"
                    }
                  });
                  // 即使服务器请求失败，我们也继续本地登出流程
                } catch (serverError) {
                  console.error("Server logout failed, continuing with local logout:", serverError);
                }
              }
              
              // 清除所有用户数据
              await clearAllUserData();
              
              // 关闭菜单
              setMenuVisible(false);
              
              // 跳转到登录页面
              router.push('/(tabs)/signin');
            } catch (error) {
              console.error("Error during sign out:", error);
              Alert.alert("Error", "Failed to sign out completely. Please try again.");
            }
          },
        },
      ]
    );
  };

  // 计算上次训练距今时间

  // 如果正在加载数据，可以显示加载指示器
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>VitalGaze</Text>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
          <Icon name="menu" size={30} color="#1E567D" />
        </TouchableOpacity>
      </View>

      {/* 菜单弹出层 */}
      {menuVisible && (
        <View style={styles.menu}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuHeaderText}>{username || "Guest"}</Text>
          </View>
          <TouchableOpacity style={styles.menuItemContainer} onPress={() => {
            setMenuVisible(false);
            router.push("/profile");
          }}>
            <Icon name="person-outline" size={22} color="#1E567D" />
            <Text style={styles.menuItem}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItemContainer} onPress={() => {
            setMenuVisible(false);
            router.push("/settings");
          }}>
            <Icon name="settings-outline" size={22} color="#1E567D" />
            <Text style={styles.menuItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItemContainer} onPress={handleSignOut}>
            <Icon name="log-out-outline" size={22} color="#1E567D" />
            <Text style={styles.menuItem}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.greetingContainer}>
        <Text style={styles.personalizedGreeting}>
          Hello, {username || "Guest"}!
        </Text>
        <Text style={styles.subtitle}>Track your eye health and progress</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.iconContainer}>
            <Icon name="fitness-outline" size={24} color="#1E567D" />
          </View>
          <Text style={styles.statTitle}>Exercises</Text>
          <Text style={styles.statValue}>20</Text>
          <Text style={styles.statSubtext}>completed</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.iconContainer}>
            <Icon name="time-outline" size={24} color="#1E567D" />
          </View>
          <Text style={styles.statTitle}>Last Session</Text>
          <Text style={styles.statSubtext}>15 mins duration</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="calendar-outline" size={22} color="#1E567D" />
          <Text style={styles.cardTitle}>Upcoming Session</Text>
        </View>
        <View style={styles.upcomingSession}>
          <View style={styles.sessionTime}>
            <Text style={styles.timeText}>3:00</Text>
            <Text style={styles.timePeriod}>PM</Text>
          </View>
          <View style={styles.sessionDetails}>
            <Text style={styles.sessionTitle}>Eye Relaxation Training</Text>
            <Text style={styles.sessionSubtitle}>15 minutes · Focus exercises</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/training")}
        activeOpacity={0.8}
      >
        <Icon name="play" size={20} color="#FFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Start Training</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: "#F4F7F9",
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: "#1E567D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#FFF",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E567D",
  },
  menuButton: {
    padding: 5,
  },
  menu: {
    position: "absolute",
    top: 95,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20,
    overflow: "hidden",
  },
  menuHeader: {
    backgroundColor: "#F0F6FA",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  menuHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E567D",
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItem: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  greetingContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  personalizedGreeting: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ECF5FB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  statSubtext: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  upcomingSession: {
    flexDirection: "row",
    alignItems: "center",
  },
  sessionTime: {
    backgroundColor: "#ECF5FB",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    minWidth: 65,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E567D",
  },
  timePeriod: {
    fontSize: 12,
    color: "#1E567D",
    marginTop: 2,
  },
  sessionDetails: {
    marginLeft: 15,
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 3,
  },
  sessionSubtitle: {
    fontSize: 13,
    color: "#888",
  },
  button: {
    backgroundColor: "#1E567D",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomePage;