import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // 引入Ionicons图标库
import Constants from "expo-constants"; // ✅ 获取环境变量

// ✅ 获取 API 服务器 URL
const API_URL = Constants.expoConfig?.extra?.API_URL || "http://localhost:5000";

console.log("🌍 使用的 API 地址:", API_URL);

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // 存储邮箱
  const [username, setUsername] = useState<string>(""); // 存储用户名
  const [password, setPassword] = useState<string>(""); // 存储密码
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // 存储确认密码

  // 错误提示
  const [emailError, setEmailError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const router = useRouter();

  // ✅ 邮箱格式验证
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(email);
    setEmailError(emailRegex.test(email) ? "" : "Please enter a valid email.");
  };

  // ✅ 用户名验证
  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    setUsername(username);
    setUsernameError(usernameRegex.test(username) ? "" : "3-20 characters, letters, numbers, and underscores only.");
  };

  // ✅ 密码验证
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    setPassword(password);
    setPasswordError(passwordRegex.test(password) ? "" : "6-20 characters, 1 uppercase, 1 lowercase, 1 number.");
  };

  // ✅ 确认密码验证
  const validateConfirmPassword = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    setConfirmPasswordError(confirmPassword === password ? "" : "Passwords do not match.");
  };

  // ✅ 提交注册
  const handleSignUp = async () => {
    if (emailError || usernameError || passwordError || confirmPasswordError) {
      Alert.alert("Error", "Please fix the errors before signing up.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "User registered successfully!");
        router.push('/(tabs)/signin');  // 注册成功跳转到登录页
      } else {
        Alert.alert("Error", data.error || "Signup failed");
      }
    } catch (error) {
      Alert.alert("Error", "Network request failed. Please check your connection.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 返回按钮 */}
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* 页面顶部 Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>VitalGaze</Text>
        <Text style={styles.subtitle}>Eye Care Made Easy</Text>
      </View>

      {/* 📩 邮箱输入 */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={validateEmail}
        onBlur={() => validateEmail(email)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* 👤 用户名输入 */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#555"
        value={username}
        onChangeText={validateUsername}
        onBlur={() => validateUsername(username)}
      />
      {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

      {/* 🔑 密码输入 */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={validatePassword}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* 🔄 确认密码 */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={confirmPassword}
        onChangeText={validateConfirmPassword}
      />
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

      {/* ✅ 注册按钮 */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  backButton: { position: "absolute", top: 40, left: 20 },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logoText: { fontSize: 40, fontWeight: "bold", color: "#1E567D" },
  subtitle: { fontSize: 18, color: "#666" },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 10, fontSize: 16, marginBottom: 10, backgroundColor: "#f9f9f9" },
  errorText: { color: "red", fontSize: 14, marginBottom: 10 },
  signUpButton: { backgroundColor: "#1E567D", borderRadius: 8, paddingVertical: 12, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});

export default SignUpPage;