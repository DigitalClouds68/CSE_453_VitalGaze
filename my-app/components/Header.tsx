// components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }: { title: string }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E567D',
  },
});

export default Header;
