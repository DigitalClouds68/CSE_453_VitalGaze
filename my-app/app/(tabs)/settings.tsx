import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import React from 'react';
import { useRouter } from 'expo-router'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsPage: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/(tabs)/home'); // Go back to the home page
  };

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.gradient}>
        <Defs>
          <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#278EA0" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="2" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient1)" />
      </Svg>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.arrow}>←</Text>
      </TouchableOpacity>

      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon}>
        <Ionicons name="settings-outline" size={50} color="#000" />
      </TouchableOpacity>

      {/* Settings Options */}
      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>VR Device Connection</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Exercise Reminders</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.buttonText}>Configure</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Calibration</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Data Privacy</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.buttonText}>Manage</Text>
          </TouchableOpacity>
        </View>
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
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  arrow: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  settingsIcon: {
    position: 'absolute',
    top: 80,
    left: '50%',
    transform: [{ translateX: -15 }],
  },
  settingsList: {
    marginTop: 20,
    width: '90%',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  settingText: {
    fontFamily: 'Crimson Text',
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  settingButton: {
    minWidth: 100, // Ensure buttons have the same minimum width
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#278EA0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Crimson Text',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default SettingsPage;
