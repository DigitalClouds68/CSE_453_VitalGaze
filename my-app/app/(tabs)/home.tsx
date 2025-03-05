import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Menu, IconButton, Provider } from "react-native-paper";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSignOut = () => {
    // 清理用户的登录信息，退出登录
    Alert.alert("Logged out", "You have successfully logged out.");
    router.replace('/'); // 返回到开始页面
  };

  const handleNavigateToTraining = () => {
    router.push("/training"); // 跳转到训练页面
  };

  const handleNavigateToProfile = () => {
    router.push("/profile"); // 跳转到个人资料页面
  };

  const handleNavigateToSettings = () => {
    router.push("/settings"); // 跳转到设置页面
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to VitalGaze</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="menu"
                size={30}
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item onPress={handleNavigateToSettings} title="Settings" />
            <Menu.Item onPress={handleNavigateToProfile} title="Profile" />
            <Menu.Item onPress={handleSignOut} title="Sign Out" />
          </Menu>
        </View>

        <Text style={styles.subtitle}>Track your eye health and progress</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Progress</Text>
          <Text style={styles.cardContent}>Eye relaxation exercises completed: 20</Text>
          <Text style={styles.cardContent}>Last training session: 10 mins ago</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming Sessions</Text>
          <Text style={styles.cardContent}>Next session: 3 PM</Text>
          <Text style={styles.cardContent}>Duration: 15 mins</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNavigateToTraining}>
            <Text style={styles.buttonText}>Start Training</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleNavigateToProfile}>
            <Text style={styles.buttonText}>Go to Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleNavigateToSettings}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1E567D",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    width: "100%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    maxWidth: 420,
  },
  button: {
    backgroundColor: "#1E567D",
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    textTransform: "uppercase",
  },
});

export default HomePage;
