import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // 引入Ionicons图标库

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState(""); // 存储邮箱
  const [username, setUsername] = useState(""); // 存储用户名
  const [password, setPassword] = useState(""); // 存储密码
  const [confirmPassword, setConfirmPassword] = useState(""); // 存储确认密码

  // 错误提示
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useRouter();

  // 验证表单字段
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    // 校验用户输入
    if (emailError || usernameError || passwordError || confirmPasswordError) {
      Alert.alert("Error", "Please fix the errors before signing up.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.217:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "User registered successfully!");
        router.push('/(tabs)/signin');  // 成功后跳转到其他页面
      } else {
        Alert.alert("Error", data.error || "Signup failed");
      }
    } catch (error) {
      Alert.alert("Error", "Network request failed. Please check your connection.");
    }
  };

  // 密码验证
  const handlePasswordChange = (password: string) => {
    setPassword(password);
    if (password.length < 6 || password.length > 20) {
      setPasswordError("Password must be between 6 and 20 characters.");
    } else {
      setPasswordError("");
    }
  };

  // 确认密码验证
  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
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
          marginBottom: 10,
          backgroundColor: "#f9f9f9",
        }}
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
        onBlur={() => {
          if (!validateEmail(email)) setEmailError("Please enter a valid email.");
          else setEmailError("");
        }}
      />
      {emailError ? <Text style={{ color: "red", fontSize: 14 }}>{emailError}</Text> : null}

      {/* Username 输入框 */}
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
          marginBottom: 10,
          backgroundColor: "#f9f9f9",
        }}
        placeholder="Username"
        placeholderTextColor="#555"
        value={username}
        onChangeText={setUsername}
        onBlur={() => {
          if (!username) setUsernameError("Username is required.");
          else setUsernameError("");
        }}
      />
      {usernameError ? <Text style={{ color: "red", fontSize: 14 }}>{usernameError}</Text> : null}

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
          marginBottom: 10,
          backgroundColor: "#f9f9f9",
        }}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      {passwordError ? <Text style={{ color: "red", fontSize: 14 }}>{passwordError}</Text> : null}

      {/* Confirm Password 输入框 */}
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
          marginBottom: 10,
          backgroundColor: "#f9f9f9",
        }}
        placeholder="Confirm Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      {confirmPasswordError ? <Text style={{ color: "red", fontSize: 14 }}>{confirmPasswordError}</Text> : null}

      {/* Sign Up 按钮 */}
      <TouchableOpacity
        style={{
          backgroundColor: "#1E567D",
          height: 54,
          width: "100%",  // 按钮占满整个宽度
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
        }}
        onPress={handleSignUp}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
          Sign Up
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default SignUpPage;