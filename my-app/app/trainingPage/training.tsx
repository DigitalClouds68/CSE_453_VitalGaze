import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useSocket } from "@/contexts/SocketContext";

const startTraining = (mode: string) => {
  console.log(`Training started for mode: ${mode}`);
};

const TrainingScreen = () => {
  const { sendAICommand } = useSocket();
  const [currentMode, setCurrentMode] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const router = useRouter();

  const handleModeSelect = (mode: string) => {
    setScore(0);
    setCurrentMode('');

    setTimeout(() => {
      setCurrentMode(mode);
      startTraining(mode);

      const getShortMode = (mode: string) => {
        if (mode === 'Fixation Training') return 'Fixation';
        if (mode === 'Saccadic Training') return 'Saccade';
        if (mode === 'Pursuit Training') return 'Pursuit';
      };

      const shortMode = getShortMode(mode);
      sendAICommand("START_AI");
      router.push(`/UnityWebGL?mode=${shortMode}`);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1E567D" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Training Modes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.modeSelectionContainer}>
          {/* Fixation */}
          <TouchableOpacity style={styles.card} onPress={() => handleModeSelect('Fixation Training')}>
            <Text style={styles.cardTitle}>Fixation Training</Text>
            <Text style={styles.cardDescription}>
              Train your eyes to maintain focus on a fixed point, improving stability and reducing eye strain.
            </Text>
          </TouchableOpacity>

          {/* Saccadic */}
          <TouchableOpacity style={styles.card} onPress={() => handleModeSelect('Saccadic Training')}>
            <Text style={styles.cardTitle}>Saccadic Training</Text>
            <Text style={styles.cardDescription}>
              Exercise rapid eye movements between targets to improve reading speed and visual processing.
            </Text>
          </TouchableOpacity>

          {/* Pursuit */}
          <TouchableOpacity style={styles.card} onPress={() => handleModeSelect('Pursuit Training')}>
            <Text style={styles.cardTitle}>Pursuit Training</Text>
            <Text style={styles.cardDescription}>
              Practice smoothly following moving objects to enhance coordination and tracking ability.
            </Text>
          </TouchableOpacity>

          {/* Score / History */}
          {currentMode ? (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Current Score: {score}</Text>
            </View>
          ) : (
            <Text style={styles.historyMessage}>No training history yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f8ff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E567D',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  modeSelectionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E567D',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    lineHeight: 20,
  },
  scoreContainer: {
    marginTop: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  historyMessage: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default TrainingScreen;
