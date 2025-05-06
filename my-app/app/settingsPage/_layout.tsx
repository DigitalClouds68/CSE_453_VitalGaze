// app/settingsPage/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';

export default function SettingsPageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
