import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Alert, ActivityIndicator, StatusBar } from "react-native"; // ✅ 添加 StatusBar
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://cse-453-vitalgaze-1.onrender.com";

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
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        Alert.alert("Error", "Invalid server response.");
        return;
      }

      if (response.ok) {
        if (!data.token) {
          Alert.alert("Error", "No authentication token received.");
          return;
        }

        await AsyncStorage.setItem("authToken", data.token);
        if (data.user) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }

        Alert.alert("Success", "Login successful!");
        router.push("/(tabs)/home");
      } else {
        Alert.alert("Error", data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Network request failed:", error);
      Alert.alert("Error", "Network request failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {/* ✅ 隐藏状态栏 */}
      <StatusBar hidden={true} />

      {/* 返回按钮 */}
      <TouchableOpacity onPress={() => router.replace('/')} style={{ position: "absolute", top: 40, left: 20 }}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* logo 和名称 */}
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "#1E567D" }}>VitalGaze</Text>
        <Text style={{ fontSize: 18, color: "#666" }}>Eye Care Made Easy</Text>
      </View>

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

      <Animated.View style={{ transform: [{ scale: scaleAnim }], width: "100%" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#1E567D",
            height: 54,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
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
