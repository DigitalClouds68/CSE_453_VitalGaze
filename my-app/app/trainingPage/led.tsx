// /app/(tabs)/led.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
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
    // 可以进入训练反馈页面，或保持原地显示训练中状态
  };

  const handleExit = () => {
    globalThis.esp32Socket?.send(JSON.stringify({ mode: "IDLE" }));
    router.push('/'); // 返回到父级页面
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleExit} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      <Text style={styles.header}>LED Mode Configuration</Text>

      <Text>Direction:</Text>
      <View style={styles.options}>
        <TouchableOpacity style={styles.optionButton} onPress={() => setDirection('CW')}>
          <Text>Clockwise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => setDirection('CCW')}>
          <Text>Counter-clockwise</Text>
        </TouchableOpacity>
      </View>

      <Text>Speed: {speed}</Text>
      <View style={styles.options}>
        {[1,3,5,7,10].map(s => (
          <TouchableOpacity key={s} style={styles.optionButton} onPress={() => setSpeed(s)}>
            <Text>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Start LED Training" onPress={startLEDTraining} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  options: { flexDirection: 'row', marginVertical: 10 },
  optionButton: { padding: 10, marginHorizontal: 5, backgroundColor: '#eee', borderRadius: 5 },
  backButton: { position: 'absolute', top: 10, left: 10 },
});

export default LEDConfigScreen;
