import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { useRouter } from "expo-router";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");  // Changed from username to email
  const [password, setPassword] = useState("");
  const router = useRouter();
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

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.217:5000/api/auth/login", {  // Updated API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),  // Sending email instead of username
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        router.push("/(tabs)/home");
      } else {
        console.log("Login failed:", data.error || "Invalid credentials");
        Alert.alert("Error", data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Network request failed:", error);
      Alert.alert("Error", "Network request failed. Please check your connection.");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", position: "relative" }}>
      <Svg height="100%" width="100%" style={{ position: "absolute", top: 0, left: 0 }}>
        <Defs>
          <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1E567D" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient1)" />
      </Svg>

      <View style={{ width: "90%", maxWidth: 420, backgroundColor: "rgba(255, 255, 255, 0.95)", borderRadius: 18, padding: 32, alignItems: "center" }}>
        <Text style={{ fontSize: 34, fontWeight: "900", textAlign: "center", marginBottom: 26, color: "#1E567D" }}>Sign In</Text>

        <TextInput
          style={{ width: "100%", height: 54, borderWidth: 2, borderColor: "#ddd", borderRadius: 14, paddingHorizontal: 18, fontSize: 18, color: "#333", marginBottom: 18, backgroundColor: "#f9f9f9" }}
          placeholder="Email"  // Updated placeholder
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{ width: "100%", height: 54, borderWidth: 2, borderColor: "#ddd", borderRadius: 14, paddingHorizontal: 18, fontSize: 18, color: "#333", marginBottom: 18, backgroundColor: "#f9f9f9" }}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={{ backgroundColor: "#1E567D", borderRadius: 14, paddingVertical: 18, width: "100%", alignItems: "center", marginTop: 24 }}
            onPress={handleSignIn}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "800", textTransform: "uppercase", letterSpacing: 1.2 }}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={{ fontSize: 18, color: "#666", marginTop: 24 }}>
          Not on VitalGaze?{" "}
          <Text style={{ color: "#1E567D", fontWeight: "800" }} onPress={() => router.push("/signup")}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignInPage;
