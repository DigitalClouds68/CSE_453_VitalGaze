import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LEDConfigScreen = () => {
  const router = useRouter();
  const [direction, setDirection] = useState<'CW'|'CCW'>('CW');
  const [speed, setSpeed] = useState<number>(5);

  const startLEDTraining = () => {
    globalThis.esp32Socket?.send(JSON.stringify({
      mode: "LED",
      direction,
      speed
    }));
  };

  const handleExit = () => {
    globalThis.esp32Socket?.send(JSON.stringify({ mode: "IDLE" }));
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={handleExit} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#1E567D" />
        </TouchableOpacity>

        <Text style={styles.header}>LED Mode Configuration</Text>

        <Text style={styles.label}>Direction:</Text>
        <View style={styles.options}>
          <TouchableOpacity style={styles.optionButton} onPress={() => setDirection('CW')}>
            <Text>Clockwise</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => setDirection('CCW')}>
            <Text>Counter-clockwise</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Speed: {speed}</Text>
        <View style={styles.options}>
          {[1, 3, 5, 7, 10].map(s => (
            <TouchableOpacity key={s} style={styles.optionButton} onPress={() => setSpeed(s)}>
              <Text>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Start LED Training" onPress={startLEDTraining} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5 },
  options: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
});

export default LEDConfigScreen;
