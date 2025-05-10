// app/_layout.tsx

import React, { useEffect, memo } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DataProvider } from '../contexts/DataContext';
import { SocketProvider } from '../contexts/SocketContext';
import { useColorScheme } from '@/components/useColorScheme';

// Keep router ErrorBoundary
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const AppProviders = memo<{ children: React.ReactNode }>(({ children }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <DataProvider>{children}</DataProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Throw if font loading fails
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Hide splash when fonts are ready
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Avoid rendering navigation until fonts loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SocketProvider>  
      <AppProviders>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UnityWebGL"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settingsPage"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="trainingPage"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signinup"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal' }}
          />
        </Stack>
      </AppProviders>
    </SocketProvider>
  );
}
