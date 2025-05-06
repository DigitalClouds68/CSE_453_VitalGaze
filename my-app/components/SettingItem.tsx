// components/SettingItem.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SettingItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
}

const SettingItem = ({ icon, label, onPress }: SettingItemProps) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <MaterialIcons name={icon} size={24} color="#1E567D" />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: '#1E567D',
  },
});

export default SettingItem;
