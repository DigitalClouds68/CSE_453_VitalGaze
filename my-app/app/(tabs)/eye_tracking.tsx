import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const EyeTrackingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Eye Tracking');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/(tabs)/eye_tracking') {
      setActiveTab('Eye Tracking');
    }
  }, [pathname]);

  const handleTabChange = (tab: string) => {
    if (tab === 'Training') {
      router.push('/(tabs)/training');
    } else if (tab === 'Eye Tracking') {
      router.push('/(tabs)/eye_tracking');
    } else if (tab === 'Progress') {
      router.push('/(tabs)/progress');
    }
  };

  const handleBack = () => {
    router.push('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.arrow}>←</Text>
      </TouchableOpacity>

      <View style={styles.nav}>
        {['Training', 'Eye Tracking', 'Progress'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => handleTabChange(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.visualization}>
        <View style={styles.eyeIcon} />
        <Text style={styles.visualizationText}>Max Eye Movement: N/A</Text>
        <Text style={styles.visualizationText}>Eye Movement Analytics: N/A</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4F7',
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  arrow: {
    fontSize: 30,
    color: '#278EA0',
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
  tab: {
    fontSize: 18,
    color: '#7A7A7A',
    paddingVertical: 10,
    fontWeight: '500',
  },
  activeTab: {
    color: '#278EA0',
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: '#278EA0',
  },
  visualization: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },
  eyeIcon: {
    width: 120,
    height: 120,
    backgroundColor: '#D9EFFF',
    borderRadius: 60,
    marginBottom: 20,
  },
  visualizationText: {
    fontSize: 18,
    color: '#444',
    fontWeight: '500',
    marginVertical: 5,
  },
});

export default EyeTrackingPage;