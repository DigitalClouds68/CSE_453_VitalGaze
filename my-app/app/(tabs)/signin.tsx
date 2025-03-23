import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // 引入Ionicons图标库
import Constants from "expo-constants"; // ✅ 获取环境变量

// ✅ 获取 API 服务器 URL
const API_URL = Constants.expoConfig?.extra?.API_URL || "http://localhost:5000";

console.log("🌍 使用的 API 地址:", API_URL);
import AsyncStorage from "@react-native-async-storage/async-storage"; // 引入AsyncStorage

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState(""); // 存储邮箱
  const [password, setPassword] = useState(""); // 存储密码
  const router = useRouter(); // 路由

  const scaleAnim = new Animated.Value(1); // 用于按钮点击时的动画

  // 按钮按下时的动画效果
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  // 按钮恢复正常状态
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // 登录处理函数
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    console.log(`🔹 正在请求 API: ${API_URL}/api/auth/signin`);
    console.log("📩 发送的数据:", { email, password });

    try {
      const response = await fetch(`${API_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // 发送邮箱和密码
      });

      const data = await response.json(); // 解析返回的数据
      console.log("📩 API 响应:", data);

      if (response.ok) {
        // 登录成功，将token存储在本地
        await AsyncStorage.setItem("authToken", data.token);

        Alert.alert("Success", "Login successful!");
        router.push("/(tabs)/home"); // 登录成功后跳转到主页
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
