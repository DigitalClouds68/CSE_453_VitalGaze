import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EyeTrackingPage: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Real-Time Eye Tracking</Text>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.nav}>
        <Text style={styles.navText}>Training</Text>
        <Text style={[styles.navText, styles.activeTab]}>Eye Tracking</Text>
        <Text style={styles.navText}>Progress</Text>
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
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginRight: 10,
  },
  backText: {
    fontFamily: 'Crimson Text',
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#278EA0',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  navText: {
    fontFamily: 'Crimson Text',
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  activeTab: {
    color: '#278EA0', // Highlighted color for the active tab
  },
  visualization: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    width: 100, // Larger size for the eye icon
    height: 100,
    backgroundColor: 'lightgray',
    borderRadius: 50, // Circular shape
    marginBottom: 20,
  },
  visualizationText: {
    fontFamily: 'Crimson Text',
    fontSize: 16,
    color: '#565555',
    marginVertical: 5,
  },
});

export default EyeTrackingPage;
