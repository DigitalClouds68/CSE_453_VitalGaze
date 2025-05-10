import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  Linking,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import * as Network from 'expo-network';
import * as Permissions from 'expo-permissions';
import OpenSettings from 'react-native-open-settings';
import WifiManager, { WifiEntry } from 'react-native-wifi-reborn';

import BackButton from '@/components/BackButton';
import SectionHeader from '@/components/SectionHeader';

export default function WifiConfigScreen() {
  const DEVICE_AP_SSID = 'VitalGaze-ESP32S3-XIAO';
  const DEVICE_CONFIG_URL = 'http://192.168.4.1/config';

  const [currentSSID, setCurrentSSID] = useState<string | null>(null);
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [wifiList, setWifiList] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const netState = await Network.getNetworkStateAsync();
        const ssid = (netState as any)?.details?.ssid ?? null;
        setCurrentSSID(ssid);
      } catch (e) {
        console.warn('Failed to get current Wi-Fi SSID', e);
      }
    })();
  }, []);

  const handleScanWifi = async () => {
    if (Platform.OS !== 'android') return;
    setScanning(true);
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Location permission is needed to scan Wi-Fi.');
        return;
      }

      const result = await WifiManager.loadWifiList();
      const ssids = result.map((item: WifiEntry) => item.SSID).filter(Boolean);
      setWifiList(ssids);
    } catch (err) {
      console.warn('Wi-Fi scan failed', err);
    } finally {
      setScanning(false);
    }
  };

  const promptConnectToDeviceAP = () => {
    Alert.alert(
      'Connect to Device',
      `Please connect to "${DEVICE_AP_SSID}" first.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Settings',
          onPress: () => {
            Platform.OS === 'ios'
              ? Linking.openURL('App-Prefs:root=WIFI')
              : OpenSettings.openSettings();
          },
        },
      ]
    );
  };

  const handleSubmit = async () => {
    if (!ssid.trim() || !password) {
      Alert.alert('Missing Info', 'Please enter both SSID and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(DEVICE_CONFIG_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ssid: ssid.trim(), password }),
      });

      const result = await response.json();
      if (response.ok && result.status === 'ok') {
        Alert.alert('✅ Success', 'Device connected to your Wi-Fi!');
      } else {
        Alert.alert('⚠️ Failed', result.status || 'Unexpected device response');
      }
    } catch (e: any) {
      Alert.alert('❌ Error', e.message || 'Failed to send data');
    } finally {
      setLoading(false);
    }
  };

  const notConnectedToAP = currentSSID !== DEVICE_AP_SSID;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton />
      <SectionHeader title="Wi-Fi Setup" />

      <View style={styles.noticeBanner}>
        <Text style={styles.noticeText}>🚧 Some Wi-Fi features are still under development.</Text>
      </View>

      {notConnectedToAP ? (
        <>
          <Text style={styles.info}>
            Current Wi-Fi: {currentSSID || 'Unknown'}{'\n\n'}
            Please connect to: "{DEVICE_AP_SSID}"
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={promptConnectToDeviceAP}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Go to Wi-Fi Settings</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Home Wi-Fi SSID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your SSID"
            value={ssid}
            onChangeText={setSsid}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.scanButton} onPress={handleScanWifi}>
            <Text style={styles.scanButtonText}>
              {scanning ? 'Scanning...' : 'Scan Nearby Wi-Fi'}
            </Text>
          </TouchableOpacity>

          <FlatList
            data={wifiList}
            keyExtractor={(item) => item}
            style={{ marginTop: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSsid(item)}>
                <Text style={styles.wifiItem}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.label}>Wi-Fi Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Wi-Fi Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Connect Device</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  noticeBanner: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#FFF3CD',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFEeba',
  },
  noticeText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#444',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: '#FFF',
  },
  button: {
    marginTop: 20,
    height: 48,
    backgroundColor: '#1E567D',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scanButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  wifiItem: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
});
