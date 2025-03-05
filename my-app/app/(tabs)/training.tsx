import React, { useState } from "react";
import { useRouter } from 'expo-router';
import { Alert } from "react-native";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useRouter(); // Get the router object for navigation

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(text);
    setEmailError(emailRegex.test(text) ? "" : "Enter a valid email (e.g., example@domain.com)");
  };

  const validateUsername = (text: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    setUsername(text);
    setUsernameError(usernameRegex.test(text) ? "" : "3-20 characters, letters, numbers, and underscores only.");
  };

  const validatePassword = (text: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    setPassword(text);
    setPasswordError(passwordRegex.test(text) ? "" : "6-20 characters, 1 uppercase, 1 lowercase, 1 number.");
  };

  const validateConfirmPassword = (text: string) => {
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
        router.push('/(tabs)/two'); // Navigate to the sign-in page after successful signup
      } else {
        Alert.alert("Error", data.error || "Signup failed");
      }
    } catch (error) {
      Alert.alert("Error", "Network request failed. Please check your connection.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20 }}>
      <h2>Create Your Account</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => validateEmail(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 5, borderRadius: 8 }}
      />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => validateUsername(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 5, borderRadius: 8 }}
      />
      {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => validatePassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 5, borderRadius: 8 }}
      />
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => validateConfirmPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 5, borderRadius: 8 }}
      />
      {confirmPasswordError && <p style={{ color: "red" }}>{confirmPasswordError}</p>}

      <button
        onClick={handleSignUp}
        style={{
          padding: "12px 24px",
          backgroundColor: "#278EA0",
          color: "white",
          borderRadius: 8,
          marginTop: 20,
          width: "100%",
        }}
      >
        Sign Up
      </button>

      <div style={{ marginTop: 15 }}>
        <p>
          Already have an account?{" "}
          <a href="#" onClick={() =>  router.push('/(tabs)/two')} style={{ color: "#278EA0" }}>
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
