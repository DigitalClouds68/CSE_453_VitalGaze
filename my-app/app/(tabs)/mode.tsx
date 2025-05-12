import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const TrainingIndexScreen = () => {
  const router = useRouter();
  const [showPhoneInfo, setShowPhoneInfo] = useState(false);
  const [showLedInfo, setShowLedInfo] = useState(false);

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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Phone Training Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Training Modes</Text>
            <TouchableOpacity 
              onPress={() => setShowPhoneInfo(!showPhoneInfo)}
              style={styles.infoButton}
            >
              <AntDesign name={showPhoneInfo ? "minuscircleo" : "infocirlceo"} size={24} color="#1E567D" />
            </TouchableOpacity>
          </View>
          
          {showPhoneInfo && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                These training modes use visual exercises displayed on your phone screen to strengthen 
                different eye movement patterns and improve visual performance.
              </Text>
            </View>
          )}

          {/* Fixation */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleModePress('Fixation Training')}
          >
            <Text style={styles.cardTitle}>Fixation Training</Text>
            <Text style={styles.cardDescription}>
              Train your eyes to maintain focus on a fixed point, improving stability and reducing eye strain.
            </Text>
          </TouchableOpacity>

          {/* Saccadic */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleModePress('Saccadic Training')}
          >
            <Text style={styles.cardTitle}>Saccadic Training</Text>
            <Text style={styles.cardDescription}>
              Exercise rapid eye movements between targets to improve reading speed and visual processing.
            </Text>
          </TouchableOpacity>

          {/* Pursuit */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleModePress('Pursuit Training')}
          >
            <Text style={styles.cardTitle}>Pursuit Training</Text>
            <Text style={styles.cardDescription}>
              Practice smoothly following moving objects to enhance coordination and tracking ability.
            </Text>
          </TouchableOpacity>
        </View>

        {/* LED Wearable Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>LED Wearable Mode</Text>
            <TouchableOpacity 
              onPress={() => setShowLedInfo(!showLedInfo)}
              style={styles.infoButton}
            >
              <AntDesign name={showLedInfo ? "minuscircleo" : "infocirlceo"} size={24} color="#1E567D" />
            </TouchableOpacity>
          </View>
          
          {showLedInfo && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Connect your smartphone to LED-equipped glasses for advanced training. 
                This mode allows you to control LED lights on wearable glasses to provide 
                external visual stimuli for eye movement training.
              </Text>
            </View>
          )}

          {/* LED Mode */}
          <TouchableOpacity 
            style={[styles.card, styles.ledCard]} 
            onPress={() => router.push('/trainingPage/led')}
          >
            <Text style={styles.cardTitle}>LED Wearable Training</Text>
            <Text style={styles.cardDescription}>
              Configure and start LED-based eye movement training using connected glasses.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f1f8ff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f1f8ff',
    padding: 16,
    paddingBottom: 30,
  },
  section: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E567D',
  },
  infoButton: {
    padding: 5,
  },
  infoContainer: {
    backgroundColor: '#e6f2ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  card: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9fdff',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1E567D',
  },
  ledCard: {
    borderLeftColor: '#19a86b',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E567D',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    lineHeight: 20,
  },
});

export default TrainingIndexScreen;