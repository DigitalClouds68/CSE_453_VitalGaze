import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ScoreBox = ({ score }: { score: number }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Current Score: {score}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
  },
});

export default ScoreBox;
