import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

// API Base URL (fallback if environment variable is missing)
const API_BASE_URL = Constants.expoConfig?.extra?.API_URL || "https://cse-453-vitalgaze.onrender.com";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useRouter();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = async () => {
    console.log("Starting SignUp Process...");
    console.log("Input Data:", { email, username, password, confirmPassword });

    // Input validation
    if (!email) setEmailError("Email is required.");
    else if (!validateEmail(email)) setEmailError("Invalid email format.");
    else setEmailError("");

    if (!username) setUsernameError("Username is required.");
    else setUsernameError("");

    if (!password) setPasswordError("Password is required.");
    else if (password.length < 6) setPasswordError("Password must be at least 6 characters.");
    else setPasswordError("");

    if (confirmPassword !== password) setConfirmPasswordError("Passwords do not match.");
    else setConfirmPasswordError("");

    if (emailError || usernameError || passwordError || confirmPasswordError) {
      console.log("Validation errors detected:", { emailError, usernameError, passwordError, confirmPasswordError });
      Alert.alert("Error", "Please fix the errors before signing up.");
      return;
    }

    try {
      console.log("Sending API Request to:", `${API_BASE_URL}/api/auth/signup`);
      const requestBody = JSON.stringify({ email, username, password });
      console.log("Request Payload:", requestBody);

      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        console.log("Signup successful! Redirecting to Sign In page...");
        Alert.alert("Success", "User registered successfully!");
        router.push("/signinup/signin");
      } else {
        console.log("Signup failed. Server response:", data);
        Alert.alert("Error", data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Alert.alert("Error", "Network request failed. Please check your connection.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {/* 返回按钮 */}
      <TouchableOpacity onPress={() => router.replace("/")} style={{ position: "absolute", top: 40, left: 20 }}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      {/* Logo & 标题 */}
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "#1E567D" }}>VitalGaze</Text>
        <Text style={{ fontSize: 18, color: "#666" }}>Eye Care Made Easy</Text>
      </View>

      {/* Email */}
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

      {/* Username */}
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

      {/* Password */}
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
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={{ color: "red", fontSize: 14 }}>{passwordError}</Text> : null}

      {/* Confirm Password */}
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
        onChangeText={setConfirmPassword}
      />
      {confirmPasswordError ? <Text style={{ color: "red", fontSize: 14 }}>{confirmPasswordError}</Text> : null}

      {/* Sign Up 按钮 */}
      <TouchableOpacity
        style={{
          backgroundColor: "#1E567D",
          height: 54,
          width: "100%",
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
        }}
        onPress={handleSignUp}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpPage;
