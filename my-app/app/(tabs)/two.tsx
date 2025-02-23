import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { useRouter } from "expo-router";

const SignInPage: React.FC = () => {
  const [username, setUsername] = useState("");
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

  const handleSignIn = () => {
    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.gradient}>
        <Defs>
          <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1E567D" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient1)" />
      </Svg>

      <View style={styles.whiteContainer}>
        <Text style={styles.header}>Sign In</Text>

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

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.signUpText}>
          Not on VitalGaze? <Text style={styles.signUpLink}>Sign Up</Text>
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
    borderRadius: 18,
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
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 26,
    color: "#1E567D",
  },
  input: {
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
  },
  signInButton: {
    backgroundColor: "#1E567D",
    borderRadius: 14,
    paddingVertical: 18,
    width: "100%",
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#1E567D",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  signUpText: {
    fontSize: 18,
    color: "#666",
    marginTop: 24,
  },
  signUpLink: {
    color: "#1E567D",
    fontWeight: "800",
  },
});

export default SignInPage;
