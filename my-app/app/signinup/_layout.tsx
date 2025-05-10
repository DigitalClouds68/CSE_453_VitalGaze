import React from 'react';
import { Stack } from 'expo-router';

export default function SigninupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // ✅ 关键设置
      }}
    />
  );
}
