import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://cse-453-vitalgaze-1.onrender.com";

const HomePage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [isLoading, setIsLoading] = useState(true);
  const [trainingStats, setTrainingStats] = useState<{
    total: number;
    last: { trainingType: string; duration: number } | null;
  }>({ total: 0, last: null });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        router.push("/signinup/signin");
        return;
      }

      // 1. 获取用户资料
      try {
        const resUser = await fetch(`${API_BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resUser.ok) {
          const { user } = await resUser.json();
          setUsername(user.username);
          await AsyncStorage.setItem("username", user.username);
        } else if (resUser.status === 401) {
          throw new Error("unauthorized");
        }
      } catch (err) {
        // token 过期或网络错误
        await AsyncStorage.clear();
        router.push("/signinup/signin");
        return;
      }

      // 2. 获取训练统计
      try {
        const resTrain = await fetch(`${API_BASE_URL}/api/training`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resTrain.ok) {
          const { data } = await resTrain.json();
          const sessions = Array.isArray(data) ? data : [];
          setTrainingStats({
            total: sessions.length,
            last:
              sessions.length > 0
                ? {
                    trainingType: sessions[0].trainingType,
                    duration: sessions[0].duration,
                  }
                : null,
          });
        }
      } catch (err) {
        console.error("Fetch training stats failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        onPress: async () => {
          const token = await AsyncStorage.getItem("authToken");
          if (token) {
            try {
              await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
              });
            } catch {}
          }
          await AsyncStorage.clear();
          setUsername("Guest");
          router.push("/signinup/signin");
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#F4F7F9" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7F9" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>VitalGaze</Text>
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          style={styles.menuButton}
        >
          <Icon name="menu" size={30} color="#1E567D" />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => {
              setMenuVisible(false);
              router.push("/profile");
            }}
          >
            <Icon name="person-outline" size={20} color="#1E567D" />
            <Text style={styles.menuItem}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => {
              setMenuVisible(false);
              router.push("/settings");
            }}
          >
            <Icon name="settings-outline" size={20} color="#1E567D" />
            <Text style={styles.menuItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={handleSignOut}
          >
            <Icon name="log-out-outline" size={20} color="#1E567D" />
            <Text style={styles.menuItem}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.personalizedGreeting}>
          Hello, {username || "Guest"}!
        </Text>
        <Text style={styles.subtitle}>Track your eye health and progress</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="fitness-outline" size={24} color="#1E567D" />
          <Text style={styles.statTitle}>Exercises</Text>
          <Text style={styles.statValue}>{trainingStats.total}</Text>
          <Text style={styles.statSubtext}>completed</Text>
        </View>

        <View style={styles.statCard}>
          <Icon name="time-outline" size={24} color="#1E567D" />
          <Text style={styles.statTitle}>Last Session</Text>
          <Text style={styles.statSubtext}>
            {trainingStats.last
              ? `${Math.round(trainingStats.last.duration / 60000)} mins · ${
                  trainingStats.last.trainingType
                }`
              : "No session"}
          </Text>
        </View>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/mode")}
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
    backgroundColor: "#F4F7F9",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7F9",
  },
  loadingText: {
    fontSize: 18,
    color: "#1E567D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
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
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 10,
    elevation: 3,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuItem: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  greetingContainer: {
    alignItems: "center",
    marginVertical: 25,
  },
  personalizedGreeting: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    elevation: 2,
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 4,
  },
  statSubtext: {
    fontSize: 12,
    color: "#888",
  },
  button: {
    backgroundColor: "#1E567D",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomePage;
