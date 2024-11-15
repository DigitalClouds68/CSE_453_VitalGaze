import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const TrainingPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');
  const router = useRouter();

  // Function to handle back navigation
  const handleBack = () => {
    router.push('/(tabs)/home');; // Use router.back() for going back to the previous screen
  };

  // Function to navigate to the Eye Tracking page
  const navigateToEyeTracking = () => {
    router.push('/(tabs)/eye_tracking'); // Change path as needed
  };

  // Function to navigate to the Progress page
  const navigateToProgress = () => {
    router.push('/(tabs)/progress'); // Change path as needed
  };

  // Function to navigate to the Home page
  const navigateToHome = () => {
    router.push('/(tabs)/home'); // Home page path
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.arrow}>←</Text>
      </TouchableOpacity>

      {/* Tab Headers */}
      <View style={styles.nav}>
        <Text style={[styles.tab, styles.activeTab]} onPress={navigateToHome}>Training</Text>
        <Text style={styles.tab} onPress={navigateToEyeTracking}>Eye Tracking</Text>
        <Text style={styles.tab} onPress={navigateToProgress}>Progress</Text>
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
          difficulty="Expert"
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
        <TouchableOpacity onPress={() => setSelectedDifficulty('Expert')}>
          <Text style={[styles.difficultyText, selectedDifficulty === 'Expert' && styles.selectedDifficulty]}>
          Expert
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
    backgroundColor: '#f7f7f7',  // Light background color
  },
  backButton: {
    marginBottom: 10,
  },
  arrow: {
    fontSize: 30,  // Increased size for the back arrow
    color: '#278EA0',  // Consistent color
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#278EA0',  // Blue underline for active tab
  },
  tab: {
    fontSize: 16,
    color: '#7a7a7a',
    paddingBottom: 8,
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#278EA0',
    borderBottomWidth: 2,
    borderBottomColor: '#278EA0',
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
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    marginTop: 5,
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
