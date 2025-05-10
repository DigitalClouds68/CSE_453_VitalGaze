import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const TrainingIndexScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => router.push('/trainingPage/training')}>
        <Text style={styles.cardTitle}>Unity Mode</Text>
        <Text style={styles.cardDescription}>
          Choose between Fixation, Saccade, and Pursuit training modes.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/trainingPage/led')}>
        <Text style={styles.cardTitle}>LED Mode</Text>
        <Text style={styles.cardDescription}>
          Configure and start LED-based eye movement training.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f8ff' },
  card: { width: '90%', padding: 20, marginVertical: 10, backgroundColor: '#fff', borderRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E567D' },
  cardDescription: { fontSize: 14, color: '#555', marginTop: 5 },
});

export default TrainingIndexScreen;
