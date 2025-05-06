import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  eyeData?: { x: number; y: number };
  screen: { x: number; y: number };
  world: { x: number; y: number; z: number };
  scorePercent: number;
};

const FitOverlay = ({ eyeData, screen, world, scorePercent }: Props) => (
  <View style={styles.overlay}>
    <Text style={styles.text}>
      🌍 World: x: {world.x.toFixed(2)}, y: {world.y.toFixed(2)}, z: {world.z.toFixed(2)}
    </Text>
    <Text style={styles.text}>
      📱 Screen: x: {screen.x.toFixed(2)}, y: {screen.y.toFixed(2)}
    </Text>
    {eyeData ? (
      <Text style={styles.text}>👁 Eye: x:{eyeData.x}, y:{eyeData.y}</Text>
    ) : (
      <Text style={styles.text}>No Eye Data</Text>
    )}
    <Text style={styles.text}>📐 FitScore: {scorePercent.toFixed(1)}%</Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 8,
  },
});

export default FitOverlay;
