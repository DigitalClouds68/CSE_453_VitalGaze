import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const ProgressPage: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Gradient Background using react-native-svg */}
      <Svg height="100%" width="100%" style={styles.gradient}>
        <Defs>
          <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#278EA0" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="2" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient1)" />
      </Svg>

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {/* Add back navigation logic */}}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Training Progress</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.nav}>
        <Text style={styles.navText}>Training</Text>
        <Text style={styles.navText}>Eye Tracking</Text>
        <Text style={[styles.navText, styles.activeTab]}>Progress</Text>
      </View>

      {/* Progress Metrics */}
      <View style={styles.progressMetrics}>
        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricText}>Weekly Average</Text>
            <Text style={styles.metricValue}>N/A</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricText}>Session Complete</Text>
            <Text style={styles.metricValue}>N/A</Text>
          </View>
        </View>
        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricText}>Time Spent</Text>
            <Text style={styles.metricValue}>N/A</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricText}>Personal Bests</Text>
            <Text style={styles.metricValue}>N/A</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 40,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Crimson Text',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#479FAE',
    borderRadius: 15,
    marginBottom: 20,
  },
  navText: {
    fontFamily: 'Crimson Text',
    fontSize: 19,
    fontWeight: '700',
    color: '#000000',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#278EA0',
    color: '#278EA0',
  },
  progressMetrics: {
    width: '90%',
    paddingHorizontal: 10,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricBox: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 3,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Crimson Text',
    color: '#000000',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Crimson Text',
    color: '#278EA0',
    marginTop: 5,
  },
});

export default ProgressPage;
