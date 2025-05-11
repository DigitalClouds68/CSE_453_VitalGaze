import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useSocket } from '@/contexts/SocketContext';

const LEDConfigScreen: React.FC = () => {
  const router = useRouter();
  const { eyeData, ledAngle, isConnected, sendAICommand, sendPayload } = useSocket();

  const [direction, setDirection] = useState<'CW' | 'CCW'>('CW');
  const [speed, setSpeed] = useState<number>(5);
  const [duration, setDuration] = useState<number>(3);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [configLocked, setConfigLocked] = useState<boolean>(false);

  const sendLEDCommand = () => {
    if (!isConnected) {
      Alert.alert('❌ WebSocket not connected!');
      return;
    }

    setIsSending(true);
    setConfigLocked(true);
    sendAICommand('START_AI');
    sendPayload({
      mode: 'LED',
      direction,
      speed: Math.round(speed),
      duration: Math.round(duration * 1000),
    });

    // 自动停止和解锁
    setTimeout(() => {
      stopLED(); // 自动调用停止函数，含解锁逻辑
    }, duration * 1000);

    setTimeout(() => setIsSending(false), 800);
  };

  const stopLED = () => {
    sendAICommand('STOP_AI');
    sendPayload({ mode: 'IDLE' });
    setConfigLocked(false);
  };

  const calculateMatchScore = () => {
    if (!eyeData) return 0;
    const eyeAngle = eyeData.x * 360;
    let diff = Math.abs(eyeAngle - ledAngle);
    if (diff > 180) diff = 360 - diff;
    return 1 - diff / 180;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1E567D" />
        </TouchableOpacity>

        <Text style={styles.title}>LED Training Config</Text>

        <Text
          style={{
            color: isConnected ? '#28a745' : '#FF4500',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          WebSocket: {isConnected ? '✅ Connected!!! Ready to get eye data!!!' : '❌ Not Connected'}
        </Text>

        <Text style={{ color: '#333', fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
          Match Score: {(calculateMatchScore() * 100).toFixed(1)}%
        </Text>

        <Text style={styles.label}>Direction</Text>
        <View style={styles.buttonGroup}>
          {['CW', 'CCW'].map(dir => (
            <TouchableOpacity
              key={dir}
              style={[
                styles.optionButton,
                direction === dir && styles.optionButtonActive,
              ]}
              onPress={() => setDirection(dir as 'CW' | 'CCW')}
              disabled={configLocked}
            >
              <Text
                style={[
                  styles.optionText,
                  direction === dir && styles.optionTextActive,
                  configLocked && { opacity: 0.5 },
                ]}
              >
                {dir === 'CW' ? 'Clockwise' : 'Counter-Clockwise'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Speed: {Math.round(speed)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={speed}
          onValueChange={setSpeed}
          disabled={configLocked}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#555"
          thumbTintColor="#00BFFF"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(speed)}
          editable={!configLocked}
          onChangeText={text => {
            const val = parseInt(text, 10);
            if (!isNaN(val) && val >= 1 && val <= 10) setSpeed(val);
          }}
          placeholder="Enter speed (1-10)"
        />

        <Text style={styles.label}>Duration: {duration.toFixed(1)} s</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.5}
          maximumValue={60}
          step={0.5}
          value={duration}
          onValueChange={setDuration}
          disabled={configLocked}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#555"
          thumbTintColor="#00BFFF"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(duration)}
          editable={!configLocked}
          onChangeText={text => {
            const val = parseFloat(text);
            if (!isNaN(val) && val >= 0.5 && val <= 60) setDuration(val);
          }}
          placeholder="Enter duration (seconds)"
        />

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.startButton, (isSending || configLocked) && { opacity: 0.6 }]}
            onPress={sendLEDCommand}
            disabled={isSending || configLocked}
          >
            <Text style={styles.buttonText}>
              {isSending ? 'Sending...' : 'Start'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.stopButton} onPress={stopLED}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LEDConfigScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f8ff',
  },
  container: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#1E567D',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionButtonActive: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
  optionText: {
    color: '#333',
    fontSize: 14,
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  input: {
    backgroundColor: '#fff',
    color: '#333',
    padding: 10,
    marginTop: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  actionButtons: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  startButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  stopButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
