import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const StartPage: React.FC = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      {/* Logo and Device Name Section */}
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Image
          source={require('./image.png')}
          style={{ width: 120, height: 120, marginBottom: 20 }}
        />
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#1E567D' }}>VitalGaze</Text>
        <Text style={{ fontSize: 18, color: '#666' }}>Eye Care Made Easy</Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#1E567D',
          width: '100%',
          height: 54,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 18,
        }}
        onPress={() => router.push('/signup')}
      >
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>Get Started</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        style={{
          borderColor: '#1E567D',
          borderWidth: 2,
          width: '100%',
          height: 54,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 18,
        }}
        onPress={() => router.push('/signin')}
      >
        <Text style={{ color: '#1E567D', fontSize: 20, fontWeight: '600' }}>
          Already have an account
        </Text>
      </TouchableOpacity>

      {/* Play Unity Game Button */}
      {/* <TouchableOpacity
        style={{
          backgroundColor: '#FF5733',
          width: '100%',
          height: 54,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => router.push('/UnityWebGL')}
      >
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>Play Game</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default StartPage;
