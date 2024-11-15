import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';  // Import usePathname to track the current route

const EyeTrackingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Eye Tracking');  // Set initial active tab
  const router = useRouter();
  const pathname = usePathname();  // Use pathname to track current page
  
  // Update active tab based on current route
  useEffect(() => {
    if (pathname === '/(tabs)/eye_tracking') {
      setActiveTab('Eye Tracking');  // Keep Eye Tracking bold for EyeTrackingPage
    }
  }, [pathname]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    if (tab === 'Training') {
      router.push('/(tabs)/training');
    } else if (tab === 'Eye Tracking') {
      router.push('/(tabs)/eye_tracking');
    } else if (tab === 'Progress') {
      router.push('/(tabs)/progress');
    }
  };

  // Handle back navigation
  const handleBack = () => {
    router.push('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.arrow}>←</Text>
      </TouchableOpacity>

      {/* Tab Headers */}
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => handleTabChange('Training')}>
          <Text style={[styles.tab, activeTab === 'Training' && styles.activeTab]}>
            Training
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('Eye Tracking')}>
          <Text style={[styles.tab, activeTab === 'Eye Tracking' && styles.activeTab]}>
            Eye Tracking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('Progress')}>
          <Text style={[styles.tab, activeTab === 'Progress' && styles.activeTab]}>
            Progress
          </Text>
        </TouchableOpacity>
      </View>

      {/* Visualization Section */}
      <View style={styles.visualization}>
        {/* Eye icon visualization */}
        <View style={styles.eyeIcon} />
        
        {/* Metrics below the eye icon */}
        <Text style={styles.visualizationText}>Max Eye Movement: N/A</Text>
        <Text style={styles.visualizationText}>Eye Movement Analytics: N/A</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  arrow: {
    fontSize: 30,
    color: '#278EA0',  // Consistent color for back arrow
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderBottomWidth: 2,  // Add border for the active tab to be underlined
    borderBottomColor: '#278EA0',  // Consistent blue color for active tab underline
  },
  tab: {
    fontSize: 16,
    color: '#7a7a7a',  // Gray color for inactive tabs
    paddingBottom: 8,  // Space for the underline
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#278EA0',  // Highlight active tab in blue
    borderBottomWidth: 2,
    borderBottomColor: '#278EA0',  // Add underline to active tab
  },
  visualization: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    marginBottom: 20,
  },
  visualizationText: {
    fontSize: 16,
    color: '#565555', 
    marginVertical: 5,
  },
});

export default EyeTrackingPage;
