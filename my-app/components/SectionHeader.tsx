import React from "react";
import { Text, StyleSheet } from "react-native";

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.header}>{title}</Text>
);

const styles = StyleSheet.create({
  header: {
    marginTop: 90,
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E567D",
    textAlign: "center",
  },
});

export default SectionHeader;
