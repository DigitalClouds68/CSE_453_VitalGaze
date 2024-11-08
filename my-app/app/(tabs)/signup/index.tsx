import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
            {/* White container in the middle */}
            <View style={styles.whiteContainer}>
                <Text style={styles.header}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#000000"  // Set placeholder text color to black
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#000000"  // Set placeholder text color to black
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#000000"  // Set placeholder text color to black
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#000000"  // Set placeholder text color to black
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={styles.signInButton} onPress={() => {}}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.signUpLink}>
                    Already on VitalGaze? <Text style={styles.link}>Sign In</Text>
                </Text>
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
    whiteContainer: {
        width: '90%',  // Container width
        maxWidth: 350, // Maximum width for the container
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',  // Center content vertically
        shadowColor: '#000',  // Optional shadow effect
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,  // Shadow for Android
    },
    header: {
        fontSize: 29.344,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,  // Adjusted margin for better spacing
        color: '#000000',
    },
    input: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 16,
        fontSize: 18,
        color: '#000',
    },
    signInButton: {
        backgroundColor: '#000000',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 50,
        marginTop: 30,
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22.208,
        textAlign: 'center',
    },
    signUpLink: {
        fontSize: 17.6,
        color: '#000',
        textAlign: 'center',
    },
    link: {
        color: 'blue',
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
});

export default SignUpPage;
