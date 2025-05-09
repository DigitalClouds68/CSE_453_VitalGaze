import React, { useState, useEffect } from 'react';
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
import { useDataContext } from '@/contexts/DataContext';

const LEDConfigScreen = () => {
  const router = useRouter();
  const [direction, setDirection] = useState<'CW' | 'CCW'>('CW');
  const [speed, setSpeed] = useState<number>(5);
  const [duration, setDuration] = useState<number>(3); // 秒
  const [isSending, setIsSending] = useState<boolean>(false);

  const { eyeData, ledAngle, setLedAngle } = useDataContext();

  // 发送 LED 控制命令并启动 AI
  const sendLEDCommand = () => {
    if (!globalThis.esp32Socket || globalThis.esp32Socket.readyState !== 1) {
      Alert.alert('❌ WebSocket not connected!');
      return;
    }

    setIsSending(true);
    globalThis.esp32Socket.send('START_AI');

    const payload = {
      mode: 'LED',
      direction,
      speed: Math.round(speed),
      duration: Math.round(duration * 1000), // 转换为毫秒
    };

    globalThis.esp32Socket.send(JSON.stringify(payload));
    setTimeout(() => setIsSending(false), 800);
  };

  // 停止 LED 和 AI
  const stopLED = () => {
    globalThis.esp32Socket?.send('STOP_AI');
    globalThis.esp32Socket?.send(JSON.stringify({ mode: 'IDLE' }));
  };

  // 监听 WebSocket 接收 LED 角度
  useEffect(() => {
    const socket = globalThis.esp32Socket;
    if (!socket) return;

    const handleMessage = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'led_angle') {
          setLedAngle(data.angle);
        }
      } catch (err) {
        console.warn('Invalid WebSocket message', err);
      }
    };

    socket.addEventListener('message', handleMessage);
    return () => socket.removeEventListener('message', handleMessage);
  }, [setLedAngle]);

  // 计算拟合度
  const calculateMatchScore = () => {
    if (!eyeData) return 0;
    const eyeAngle = eyeData.x * 360;
    let diff = Math.abs(eyeAngle - ledAngle);
    if (diff > 180) diff = 360 - diff;
    return 1 - diff / 180; // 拟合度 0~1
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 返回按钮 */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1E567D" />
        </TouchableOpacity>

        <Text style={styles.title}>LED Training Config</Text>

        {/* WebSocket 状态 */}
          <Text style={{ color: globalThis.esp32Socket?.readyState === 1 ? '#28a745' : '#FF4500', marginBottom: 10 }}>
          WebSocket: {globalThis.esp32Socket?.readyState === 1 ? '✅ Connected' : '❌ Not Connected'}
        </Text>

        {/* 拟合度 */}
        <Text style={{ color: '#333', fontSize: 16, marginBottom: 8 }}>
          Match Score: {(calculateMatchScore() * 100).toFixed(1)}%
        </Text>

        {/* 方向 */}
        <Text style={styles.label}>Direction</Text>
        <View style={styles.buttonGroup}>
          {['CW', 'CCW'].map((dir) => (
            <TouchableOpacity
              key={dir}
              style={[
                styles.optionButton,
                direction === dir && styles.optionButtonActive,
              ]}
              onPress={() => setDirection(dir as 'CW' | 'CCW')}
            >
              <Text
                style={[
                  styles.optionText,
                  direction === dir && styles.optionTextActive,
                ]}
              >
                {dir === 'CW' ? 'Clockwise' : 'Counter-Clockwise'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 速度 */}
        <Text style={styles.label}>Speed: {Math.round(speed)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={speed}
          onValueChange={setSpeed}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#555"
          thumbTintColor="#00BFFF"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(speed)}
          onChangeText={(text) => {
            const val = parseInt(text);
            if (!isNaN(val) && val >= 1 && val <= 10) setSpeed(val);
          }}
          placeholder="Enter speed (1-10)"
        />

        {/* 持续时间（秒） */}
        <Text style={styles.label}>Duration: {duration.toFixed(1)} s</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.5}
          maximumValue={60}
          step={0.5}
          value={duration}
          onValueChange={setDuration}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#555"
          thumbTintColor="#00BFFF"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(duration)}
          onChangeText={(text) => {
            const val = parseFloat(text);
            if (!isNaN(val) && val >= 0.5 && val <= 60) setDuration(val);
          }}
          placeholder="Enter duration (seconds)"
        />

        {/* 控制按钮 */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.startButton, isSending && { opacity: 0.6 }]}
            onPress={sendLEDCommand}
            disabled={isSending}
          >
            <Text style={styles.buttonText}>{isSending ? 'Sending...' : 'Start'}</Text>
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

// ------------------- 样式 ---------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f8ff', // 浅蓝背景
  },
  container: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#1E567D', // 深蓝色标题
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333', // 更深的文字色
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
    borderColor: '#ccc', // 更亮边框
    marginRight: 10,
    backgroundColor: '#ffffff', // 卡片白底
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionButtonActive: {
    backgroundColor: '#1E90FF', // 蓝色高亮
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
    backgroundColor: '#ffffff',
    color: '#333', // 输入文字也要能看见
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
    backgroundColor: '#1E90FF', // 更亮蓝
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  stopButton: {
    backgroundColor: '#dc3545', // Bootstrap 风格红
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});

