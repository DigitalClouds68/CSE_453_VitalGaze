import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  // Function to handle navigation on button press
  const navigateTo = (page: string) => {
    if (page === 'training') {
      router.push('/(tabs)/training');
    } else if (page === 'eye_tracking') {
      router.push('/(tabs)/eye_tracking');
    } else if (page === 'progress') {
      router.push('/(tabs)/progress');
    }
  };

  // Navigate to Settings page
  const goToSettings = () => {
    router.push('/(tabs)/settings'); // Adjust the path based on your file structure
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <Svg height="100%" width="100%" style={styles.gradient}>
        <Defs>
          <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#278EA0" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="2" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient1)" />
      </Svg>

      <Text style={styles.header}>Welcome Back</Text>

      {/* Settings Icon in top-right corner */}
      <TouchableOpacity style={styles.settingsIcon} onPress={goToSettings}>
        <Ionicons name="settings-outline" size={30} color="#000" />
      </TouchableOpacity>

      {/* Buttons for navigation */}
      <View style={styles.textFieldContainer}>
        <TouchableOpacity style={styles.textField} onPress={() => navigateTo('training')}>
          <Text style={styles.text}>Start Training</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textField} onPress={() => navigateTo('eye_tracking')}>
          <Text style={styles.text}>Start Eye Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textField} onPress={() => navigateTo('progress')}>
          <Text style={styles.text}>Check Progress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'linear-gradient(180deg, #227788 0%, #FFFFFF 100%)',
  },
  header: {
    fontSize: 28,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textFieldContainer: {
    width: '90%',
    marginBottom: 20,
  },
  textField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 30,
  },
  text: {
    flex: 1,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
    fontSize: 19,
    color: '#000000',
    textAlign: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default DashboardPage;
