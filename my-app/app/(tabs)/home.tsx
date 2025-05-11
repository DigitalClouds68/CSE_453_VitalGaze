import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL (fallback if environment variable is missing)
const API_BASE_URL =  "https://cse-453-vitalgaze-1.onrender.com";

const HomePage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [lastSession, setLastSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          router.push('/signinup/signin');
          return;
        }
        const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.user.username) {
            setUsername(data.user.username);
            await AsyncStorage.setItem("username", data.user.username);
          } else {
            router.push('/signinup/signin');
          }
        } else {
          if (response.status === 401) {
            await handleTokenExpired();
          } else {
            Alert.alert("Error", "Failed to fetch user information.");
            router.push('/signinup/signin');
          }
        }
      } catch {
        const localUsername = await AsyncStorage.getItem("username");
        if (localUsername) {
          setUsername(localUsername);
        } else {
          router.push('/signinup/signin');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLastSession = async () => {
      try {
        const lastSessionData = await AsyncStorage.getItem("lastTrainingSession");
        if (lastSessionData) {
          setLastSession(JSON.parse(lastSessionData));
        }
      } catch {}
    };

    fetchUserData();
    fetchLastSession();
  }, []);

  const handleTokenExpired = async () => {
    await clearAllUserData();
    Alert.alert(
      "Session Expired",
      "Your session has expired. Please sign in again.",
      [{ text: "OK", onPress: () => router.push('/signinup/signin') }]
    );
  };

  const clearAllUserData = async () => {
    const keysToRemove = ["authToken", "userData", "userPreferences", "lastTrainingSession", "username"];
    await AsyncStorage.multiRemove(keysToRemove);
    setUsername("");
    setLastSession(null);
  };

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
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              });
            } catch {}
          }
          await clearAllUserData();
          setMenuVisible(false);
          router.push('/signinup/signin');
        },
      },
    ]);
  };

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

      {/* 🔵 教导用户连接热点提示区域 */}
      <View style={styles.connectionNotice}>
  <Icon name="cellular-outline" size={22} color="#1E567D" style={{ marginRight: 8 }} />
  <View style={{ flex: 1 }}>
    <Text style={styles.noticeTitle}>Enable Hotspot for Glasses</Text>
    <Text style={styles.noticeText}>
      Please enable your phone's hotspot with the following settings:
      {"\n"}Hotspot Name (SSID): <Text style={styles.bold}>VitalGaze</Text>
      {"\n"}Password: <Text style={styles.bold}>00000000</Text>
      {"\n\n"}Your glasses will automatically connect to it.
    </Text>
  </View>
  <TouchableOpacity onPress={() => router.push("/settings")}>
    <Icon name="chevron-forward-outline" size={24} color="#1E567D" />
  </TouchableOpacity>
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
        onPress={() => router.push("/mode")}
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
    elevation: 5,
    zIndex: 20,
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
  connectionNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ECF5FB",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E567D",
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 14,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
    color: "#1E567D",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    width: "48%",
    alignItems: "center",
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
