import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function StartPage() {
  return (
    <View>
      <Link href="/(tabs)/signin">
        <Button title="Sign In" />
      </Link>
      <Link href="/(tabs)/signup">
        <Button title="Sign Up" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  link: {
    marginTop: 15,
  },
});