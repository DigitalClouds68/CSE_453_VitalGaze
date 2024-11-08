import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
const DashboardPage: React.FC = () => {
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
      <Text style={styles.header}>Welcome Back</Text>
      <Image source={{ uri: 'image' }} style={styles.image} />
      <View style={styles.textFieldContainer}>
        <View style={styles.textField}>
          <Text style={styles.text}>Start Training</Text>
        </View>
        <View style={styles.textField}>
          <Text style={styles.text}>Start Eye Tracking</Text>
        </View>
        <View style={styles.textField}>
          <Text style={styles.text}>Check Progress</Text>
        </View>
        <View style={styles.textField}>
          <Text style={styles.text}>Previous Training Result </Text>
        </View>
      </View>
      <View style={styles.vector} />
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
  header: {
    fontSize: 28,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: '80%',
    height: 200,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  textFieldContainer: {
    width: '90%',
    marginBottom: 20,
  },
  textField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 30,
  },
  text: {
    flex: 1,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
    fontSize: 19,
    color: '#000000',
    textAlign: 'center',
  },
  vector: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#1A1A1A',
    width: 20,
    height: 20,
  },
});

export default DashboardPage;