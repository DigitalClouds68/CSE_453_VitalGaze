import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  title: string;
  description: string;
  onPress: () => void;
};

const TrainingCard = ({ title, description, onPress }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription} numberOfLines={3}>{description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    width: "90%",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E567D",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    lineHeight: 20,
  },
});

export default TrainingCard;
