// app/(tabs)/statistics.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statistics Page (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 18,
    color: "#1E567D"
  }
});
