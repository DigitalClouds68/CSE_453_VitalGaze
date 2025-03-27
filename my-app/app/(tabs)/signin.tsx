import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://cse-453-vitalgaze.onrender.com";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

    setLoading(true);

    try {
      console.log("📤 Sending request with:", { email, password });

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("📥 Received response:", response.status, response.statusText);

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("⚠️ Failed to parse JSON response:", jsonError);
        Alert.alert("Error", "Invalid server response.");
        return;
      }

      console.log("🔍 Response JSON:", data);

      if (response.ok) {
        if (!data.token) {
          Alert.alert("Error", "No authentication token received.");
          return;
        }

        await AsyncStorage.setItem("authToken", data.token);
        console.log("✅ Auth token saved:", data.token);

        if (data.user) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          console.log("✅ User data saved:", data.user);
        }

        Alert.alert("Success", "Login successful!");
        router.push("/(tabs)/home");
      } else {
        console.log("❌ Login failed:", data.error || "Invalid credentials");
        Alert.alert("Error", data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("🌐 Network request failed:", error);
      Alert.alert("Error", "Network request failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {/* 返回按钮 */}
      <TouchableOpacity onPress={() => router.replace('/')} style={{ position: "absolute", top: 40, left: 20 }}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* 页面顶部 logo 和设备名称 */}
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "#1E567D" }}>VitalGaze</Text>
        <Text style={{ fontSize: 18, color: "#666" }}>Eye Care Made Easy</Text>
      </View>

      {/* Email 输入框 */}
      <TextInput
        style={{
          width: "100%",
          height: 54,
          borderWidth: 2,
          borderColor: "#ddd",
          borderRadius: 14,
          paddingHorizontal: 18,
          fontSize: 18,
          color: "#333",
          marginBottom: 18,
          backgroundColor: "#f9f9f9",
        }}
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password 输入框 */}
      <TextInput
        style={{
          width: "100%",
          height: 54,
          borderWidth: 2,
          borderColor: "#ddd",
          borderRadius: 14,
          paddingHorizontal: 18,
          fontSize: 18,
          color: "#333",
          marginBottom: 18,
          backgroundColor: "#f9f9f9",
        }}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 登录按钮 */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }], width: "100%" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#1E567D",
            height: 54,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24, // 给按钮加上适当的上边距
          }}
          onPress={handleSignIn}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SignInPage;
