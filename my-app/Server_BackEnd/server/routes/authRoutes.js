import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useRouter(); // Use router for navigation

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(text);
    setEmailError(emailRegex.test(text) ? "" : "Enter a valid email (e.g., example@domain.com)");
  };

  const validateUsername = (text) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    setUsername(text);
    setUsernameError(usernameRegex.test(text) ? "" : "3-20 characters, letters, numbers, and underscores only.");
  };

  const validatePassword = (text) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    setPassword(text);
    setPasswordError(passwordRegex.test(text) ? "" : "6-20 characters, 1 uppercase, 1 lowercase, 1 number.");
  };

  const validateConfirmPassword = (text) => {
    setConfirmPassword(text);
    setConfirmPasswordError(text === password ? "" : "Passwords do not match.");
  };

  const handleSignUp = async () => {
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
        router.push('/(tabs)/two'); // Navigate to the next page
      } else {
        Alert.alert("Error", data.error || "Signup failed");
      }
    } catch (error) {
      Alert.alert("Error", "Network request failed. Please check your connection.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>

      {/* Email Input with Label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.inputGuide}>Enter a valid email (e.g., example@domain.com)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#555"
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      {/* Username Input with Label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.inputGuide}>Choose a username (3-20 characters, letters, numbers, and underscores only)</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose a username"
          placeholderTextColor="#555"
          value={username}
          onChangeText={validateUsername}
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
      </View>

      {/* Password Input with Label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <Text style={styles.inputGuide}>Create a password (6-20 characters, 1 uppercase, 1 lowercase, 1 number)</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={validatePassword}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      {/* Confirm Password Input with Label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <Text style={styles.inputGuide}>Re-enter your password to confirm</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor="#555"
          secureTextEntry
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/(tabs)/two')}>
        <Text style={styles.buttonText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 10,
  },
  inputGuide: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    textAlign: "left",
    fontStyle: "italic",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  signUpButton: {
    backgroundColor: "#278EA0",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  signInButton: {
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default SignUpPage;
