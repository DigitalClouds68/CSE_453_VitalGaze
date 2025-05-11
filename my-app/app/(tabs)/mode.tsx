import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const TrainingIndexScreen = () => {
  const router = useRouter();

  // 重用逻辑：用于跳转到 UnityWebGL 页面并传参
  const handleModePress = (mode: string) => {
    const getShortMode = (mode: string) => {
      if (mode === 'Fixation Training') return 'Fixation';
      if (mode === 'Saccadic Training') return 'Saccade';
      if (mode === 'Pursuit Training') return 'Pursuit';
      return '';
    };
    const shortMode = getShortMode(mode);
    router.push(`/UnityWebGL?mode=${shortMode}`);
  };

  return (
    <View style={styles.container}>
      {/* Fixation */}
      <TouchableOpacity style={styles.card} onPress={() => handleModePress('Fixation Training')}>
        <Text style={styles.cardTitle}>Fixation Training Mode</Text>
        <Text style={styles.cardDescription}>
          Train your eyes to maintain focus on a fixed point, improving stability and reducing eye strain.
        </Text>
      </TouchableOpacity>

      {/* Saccadic */}
      <TouchableOpacity style={styles.card} onPress={() => handleModePress('Saccadic Training')}>
        <Text style={styles.cardTitle}>Saccadic Training Mode</Text>
        <Text style={styles.cardDescription}>
          Exercise rapid eye movements between targets to improve reading speed and visual processing.
        </Text>
      </TouchableOpacity>

      {/* Pursuit */}
      <TouchableOpacity style={styles.card} onPress={() => handleModePress('Pursuit Training')}>
        <Text style={styles.cardTitle}>Pursuit Training Mode</Text>
        <Text style={styles.cardDescription}>
          Practice smoothly following moving objects to enhance coordination and tracking ability.
        </Text>
      </TouchableOpacity>

      {/* LED Mode */}
      <TouchableOpacity style={styles.card} onPress={() => router.push('/trainingPage/led')}>
        <Text style={styles.cardTitle}>LED Wearable Mode</Text>
        <Text style={styles.cardDescription}>
          Configure and start LED-based eye movement training.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f8ff', padding: 16 },
  card: { width: '100%', padding: 20, marginVertical: 10, backgroundColor: '#fff', borderRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E567D' },
  cardDescription: { fontSize: 14, color: '#555', marginTop: 5 },
});

export default TrainingIndexScreen;
