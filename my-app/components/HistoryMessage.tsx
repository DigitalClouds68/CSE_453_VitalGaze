import React from "react";
import { Text, StyleSheet } from "react-native";

const HistoryMessage = () => (
  <Text style={styles.text}>No training history yet.</Text>
);

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
  },
});

export default HistoryMessage;
