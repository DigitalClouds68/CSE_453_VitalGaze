import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const SettingsPage: React.FC = () => {
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
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            {/* Header */}
            <Text style={styles.header}>Settings</Text>

            {/* Settings Options */}
            <View style={styles.settingsList}>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>VR Device Connection</Text>
                    <Button title="Connect" onPress={() => {}} />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Exercise Reminders</Text>
                    <Button title="Configure" onPress={() => {}} />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Calibration</Text>
                    <Button title="Start" onPress={() => {}} />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Data Privacy</Text>
                    <Button title="Manage" onPress={() => {}} />
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
        backgroundColor: '#1A1A1A',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    backText: {
        fontFamily: 'Crimson Text',
        fontSize: 19,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    header: {
        fontFamily: 'Crimson Text',
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        marginVertical: 20,
    },
    settingsList: {
        marginTop: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
});

export default SettingsPage;
