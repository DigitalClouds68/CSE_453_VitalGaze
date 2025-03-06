import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useRouter } from 'expo-router'; // Import useRouter

const TrainingScreen: React.FC = () => {
  const router = useRouter();
  
  // State variables
  const [score, setScore] = useState<number>(0);
  const [mode, setMode] = useState<string>('');
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [history, setHistory] = useState<any[]>([]); // Store session history
  
  // Simulate training process
  const handleStartTraining = (selectedMode: string) => {
    setMode(selectedMode);
    setScore(0);
    setIsTraining(true); // Start training
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 100);
      setScore(newScore);
      setIsTraining(false);
      const newHistory = [...history, { mode: selectedMode, score: newScore }];
      setHistory(newHistory);
    }, 2000); // Simulate a delay for training process
  };

  // Function to determine feedback color
  const getFeedbackColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 50) return 'yellow';
    return 'red';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back button */}
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#1E567D" />
        </TouchableOpacity>

        <Text style={styles.title}>Eye Training</Text>
        <Text style={styles.subtitle}>Choose Training Mode:</Text>

        {/* Training Mode Selection Cards */}
        <View style={styles.cardContainer}>
          {['Fixation Training', 'Saccadic Training', 'Pursuit Training'].map((modeName) => (
            <TouchableOpacity
              key={modeName}
              style={[styles.card, mode === modeName && styles.selectedCard]}
              onPress={() => handleStartTraining(modeName)}>
              <Ionicons name="eye" size={40} color="#1E567D" style={styles.icon} />
              <Text style={styles.cardText}>{modeName}</Text>
              <Text style={styles.cardDescription}>Description for {modeName} mode.</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Training Feedback */}
        {mode && !isTraining && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.modeText}>Current Mode: {mode}</Text>
            <Text style={[styles.scoreText, { color: getFeedbackColor(score) }]}>Score: {score}%</Text>
            <Text style={styles.feedbackMessage}>
              {score >= 80 ? 'Great job!' : score >= 50 ? 'Keep practicing!' : 'Needs improvement.'}
            </Text>
          </View>
        )}

        {/* Loading Indicator */}
        {isTraining && (
          <ActivityIndicator size="large" color="#1E567D" style={styles.activityIndicator} />
        )}

        {/* Training History */}
        {history.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Training History:</Text>
            {history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyText}>Mode: {item.mode}</Text>
                <Text style={styles.historyText}>Score: {item.score}%</Text>
              </View>
            ))}
          </View>
        )}

        {/* Restart Button */}
        <TouchableOpacity style={styles.restartButton} onPress={() => handleStartTraining(mode)}>
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>

        {/* Help Icon */}
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle" size={30} color="#1E567D" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8FF', // Light background color
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E567D',
    marginTop: 100,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#1E567D',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
  },
  selectedCard: {
    backgroundColor: '#4A90E2',
  },
  icon: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E567D',
  },
  cardDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#1E567D',
  },
  feedbackContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  modeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E567D',
  },
  scoreText: {
    fontSize: 18,
    marginTop: 10,
  },
  feedbackMessage: {
    fontSize: 16,
    marginTop: 10,
    color: '#1E567D',
  },
  activityIndicator: {
    marginTop: 20,
  },
  historyContainer: {
    marginTop: 30,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E567D',
  },
  historyItem: {
    marginTop: 10,
  },
  historyText: {
    fontSize: 16,
    color: '#1E567D',
  },
  restartButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  restartButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  helpButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
  },
});

export default TrainingScreen;
