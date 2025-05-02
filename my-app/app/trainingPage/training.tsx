import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dummy functions for training modes
const startTraining = (mode: string) => {
  console.log(`Training started for mode: ${mode}`);
};

const TrainingScreen = () => {
  const [currentMode, setCurrentMode] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const router = useRouter();

  // Handle selecting a training mode
  const handleModeSelect = (mode: string) => {
    setScore(0);
    setCurrentMode('');
  
    setTimeout(() => {
      setCurrentMode(mode);
      startTraining(mode);
  
      const getShortMode = (mode: string) => {
        if (mode === 'Fixation Training') return 'Fixation';
        if (mode === 'Saccadic Training') return 'Saccade';
        if (mode === 'Pursuit Training')  return 'Pursuit';
      };
  
      const shortMode = getShortMode(mode);
      router.push(`/UnityWebGL?mode=${shortMode}`); // ✅ 拼接参数
    }, 500);
  };  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#1E567D" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#1E567D" />
        </TouchableOpacity> */}

        {/* Mode Selection */}
        <View style={styles.modeSelectionContainer}>
          <Text style={styles.header}>Choose Your Training Mode</Text>
          
          {/* Fixation Training Card */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleModeSelect('Fixation Training')}
          >
            <Text style={styles.cardTitle}>Fixation Training</Text>
            <Text style={styles.cardDescription} numberOfLines={3}>
              Train your eyes to maintain focus on a fixed point, improving stability and reducing eye strain.
            </Text>
          </TouchableOpacity>

          {/* Saccadic Training Card */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleModeSelect('Saccadic Training')}
          >
            <Text style={styles.cardTitle}>Saccadic Training</Text>
            <Text style={styles.cardDescription} numberOfLines={3}>
              Exercise rapid eye movements between targets to improve reading speed and visual processing.
            </Text>
          </TouchableOpacity>

          {/* Pursuit Training Card */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleModeSelect('Pursuit Training')}
          >
            <Text style={styles.cardTitle}>Pursuit Training</Text>
            <Text style={styles.cardDescription} numberOfLines={3}>
              Practice smoothly following moving objects to enhance coordination and tracking ability.
            </Text>
          </TouchableOpacity>

          {/* Display Score */}
          {currentMode && (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Current Score: {score}</Text>
            </View>
          )}

          {/* No training history message */}
          {currentMode === '' && <Text style={styles.historyMessage}>No training history yet.</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f1f8ff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  modeSelectionContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E567D',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '90%',
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
    color: '#28a745', // Green color for positive feedback
  },
  historyMessage: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default TrainingScreen;
