import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';  // Import usePathname to track the current route

const ProgressPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Progress');  // Set initial active tab to 'Progress'
  const router = useRouter();
  const pathname = usePathname();  // Use pathname to track current page

  // Update active tab based on current route
  useEffect(() => {
    if (pathname === '/(tabs)/progress') {
      setActiveTab('Progress');  // Keep Progress bold and underlined for ProgressPage
    }
  }, [pathname]);

  // Handle tab change and navigation
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);  // Update active tab
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
          <Text style={[styles.tab, activeTab === 'Training' && styles.activeTab]}>Training</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('Eye Tracking')}>
          <Text style={[styles.tab, activeTab === 'Eye Tracking' && styles.activeTab]}>Eye Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('Progress')}>
          <Text style={[styles.tab, activeTab === 'Progress' && styles.activeTab]}>Progress</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Training Progress</Text>

      {/* Progress Visualization */}
      <View style={styles.visualization}>
        <View style={styles.visualizationIcon} />
        <Text style={styles.visualizationText}>Weekly Average: N/A</Text>
        <Text style={styles.visualizationText}>Session Complete: N/A</Text>
        <Text style={styles.visualizationText}>Time Spent: N/A</Text>
        <Text style={styles.visualizationText}>Personal Bests: N/A</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7', // Light background color
  },
  backButton: {
    marginBottom: 10,
  },
  arrow: {
    fontSize: 30, // Increased size for the back arrow
    color: '#278EA0', // Consistent color
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: '#7a7a7a',  // Color for inactive tabs
    paddingBottom: 8,  // Space for the underline
  },
  activeTab: {
    fontWeight: 'bold',  // Bold text for active tab
    borderBottomWidth: 2,  // Add underline to active tab
    borderBottomColor: '#278EA0',  // Blue underline
    color: '#278EA0',  // Blue text color for active tab
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#278EA0',
    textAlign: 'center',
    marginBottom: 20,
  },
  visualization: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualizationIcon: {
    width: 100, // Visualization icon (replace as needed)
    height: 100,
    backgroundColor: 'lightgray',
    borderRadius: 50, // Circular shape
    marginBottom: 20,
  },
  visualizationText: {
    fontSize: 16,
    color: '#565555',
    marginVertical: 5,
  },
});

export default ProgressPage;
