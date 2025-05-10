import React from 'react';
import { Stack } from 'expo-router';

export default function SettingsPageLayout() {
  return (
    <Stack>
      <Stack.Screen name="bluetooth" options={{ headerShown: false }} />
      <Stack.Screen name="wifi" options={{ headerShown: false }} />
      <Stack.Screen name="analysis" options={{ headerShown: false }} />
    </Stack>
  );
}
