import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SPACING } from '../theme';

type Props = { title: string; showBack?: boolean };

export function Header({ title, showBack = false }: Props) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.cardBg,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: FONT.title,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
