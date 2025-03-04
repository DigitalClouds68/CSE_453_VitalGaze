import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
  
    try {
      const response = await fetch("http://192.168.1.217:5000/api/auth/signup", {  // Use your actual server IP
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert("Success", "User registered successfully!");
      } else {
        console.log("Signup failed:", data.error || "Unknown error");
        Alert.alert("Error", data.error || "Signup failed");
      }
    } catch (error) {
      console.log("Network request failed:", error);
      Alert.alert("Error", "Network request failed. Please check your connection and try again.");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.gradient}>
        <Defs>
          <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#278EA0" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="2" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient1)" />
      </Svg>

      <View style={styles.whiteContainer}>
        <Text style={styles.header}>Create Your Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#555"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.signInText}>
          Already have an account?{" "}
          <Text style={styles.signInLink}>Sign In</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  whiteContainer: {
    width: "90%",
    maxWidth: 420,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 30,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    backdropFilter: "blur(14px)",
  },
  header: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 26,
    color: "#278EA0",
  },
  input: {
    width: "100%",
    height: 54,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 30,
    paddingHorizontal: 18,
    fontSize: 18,
    color: "#333",
    marginBottom: 18,
    backgroundColor: "#f9f9f9",
  },
  signUpButton: {
    backgroundColor: "#278EA0",
    borderRadius: 30,
    paddingVertical: 18,
    width: "100%",
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#278EA0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  signInText: {
    fontSize: 18,
    color: "#666",
    marginTop: 24,
  },
  signInLink: {
    color: "#278EA0",
    fontWeight: "700",
  },
});

export default SignUpPage;
