import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const TrainingPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => {/* Add back navigation logic */}}>
        <Text style={styles.arrow}>←</Text>
      </TouchableOpacity>

      {/* Tab Headers */}
      <View style={styles.nav}>
        <Text style={[styles.tab, styles.activeTab]}>Training</Text>
        <Text style={styles.tab}>Eye Tracking</Text>
        <Text style={styles.tab}>Progress</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>VR Eye Training</Text>

      {/* Training Options */}
      <View style={styles.trainingList}>
        <TrainingOption
          title="Focus Training"
          duration="5 min"
          difficulty="Beginner"
          selectedDifficulty={selectedDifficulty}
        />
        <TrainingOption
          title="Eye Stretches"
          duration="10 min"
          difficulty="Intermediate"
          selectedDifficulty={selectedDifficulty}
        />
        <TrainingOption
          title="Precision Control"
          duration="15 min"
          difficulty="Advanced"
          selectedDifficulty={selectedDifficulty}
        />
      </View>

      {/* Difficulty Selector */}
      <View style={styles.difficultySelector}>
        <TouchableOpacity onPress={() => setSelectedDifficulty('Beginner')}>
          <Text style={[styles.difficultyText, selectedDifficulty === 'Beginner' && styles.selectedDifficulty]}>
            Beginner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedDifficulty('Intermediate')}>
          <Text style={[styles.difficultyText, selectedDifficulty === 'Intermediate' && styles.selectedDifficulty]}>
            Intermediate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedDifficulty('Advanced')}>
          <Text style={[styles.difficultyText, selectedDifficulty === 'Advanced' && styles.selectedDifficulty]}>
            Advanced
          </Text>
        </TouchableOpacity>
      </View>

      {/* Start Button */}
      <TouchableOpacity style={styles.startButton} onPress={() => {/* Add start training logic */}}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const TrainingOption = ({ title, duration, difficulty, selectedDifficulty }: { title: string; duration: string; difficulty: string; selectedDifficulty: string }) => (
  <View style={styles.trainingOption}>
    <Text style={styles.trainingTitle}>{title}</Text>
    <Text style={styles.trainingSubtitle}>{duration} - {difficulty}</Text>
    {selectedDifficulty === difficulty && (
      <Text style={styles.selected}>Selected</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 10,
  },
  arrow: {
    fontSize: 24,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: '#7a7a7a',
  },
  activeTab: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#278EA0',
    color: '#278EA0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#278EA0',
    textAlign: 'center',
    marginBottom: 20,
  },
  trainingList: {
    marginVertical: 20,
  },
  trainingOption: {
    marginBottom: 15,
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  trainingSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
  selected: {
    fontSize: 12,
    color: '#278EA0',
  },
  difficultySelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  difficultyText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDifficulty: {
    fontWeight: 'bold',
    color: '#278EA0',
  },
  startButton: {
    backgroundColor: '#278EA0',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 20,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TrainingPage;
