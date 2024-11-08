import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const StartPage: React.FC = () => {
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
            <View style={styles.main}>
                <Text style={styles.subtitle}>VitalGaze Your Vision, Empowered</Text>
                <Text style={styles.description}>Engage in VR eye training and track wellness anytime.</Text>
                <TouchableOpacity style={styles.startButton} onPress={() => {/* Add start training logic */}}>
        <Text style={styles.startButtonText}>Start Now!</Text>
      </TouchableOpacity>
            </View>
            <View style={styles.footer}>
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
    header: {
        alignItems: 'center',
    },
    main: {
        alignItems: 'center',
        flex: 1, // Ensures that this takes up the remaining space
        justifyContent: 'center',
    },
    subtitle: {
      top:-90,
        fontSize: 65,
        fontWeight: 'bold',
        color: '#000',
        paddingHorizontal:30,
    },
    description: {
      top:-90,
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal:25,
        marginVertical: 10,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    featureImage: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    startButton: {
      top:-90,
      backgroundColor: '#278EA0',
      paddingVertical: 15,
      paddingHorizontal: 50,
      borderRadius: 30,
      alignSelf: 'center',
      marginBottom: 20,
    },
    startButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
});

export default StartPage;
