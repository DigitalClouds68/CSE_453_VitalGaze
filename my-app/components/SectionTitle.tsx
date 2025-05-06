// components/SectionTitle.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.title}>{title}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 10,
  },
});

export default SectionTitle;
