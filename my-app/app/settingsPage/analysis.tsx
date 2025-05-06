// app/settingsPage/analysis.tsx

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDataContext } from "../../contexts/DataContext";

import BackButton from "@/components/BackButton";
import SectionHeader from "@/components/SectionHeader";

const AnalysisScreen = () => {
  const { eyeData, unityCoords } = useDataContext();
  const [errorDistance, setErrorDistance] = useState(0);

  useEffect(() => {
    if (!eyeData) return;

    const camW = 320;
    const camH = 240;
    const unityW = 3200;
    const unityH = 2000;

    const mappedEyeX = (eyeData.x / camW) * unityW;
    const mappedEyeY = unityH - (eyeData.y / camH) * unityH;

    const dx = unityCoords.screen.x - mappedEyeX;
    const dy = unityCoords.screen.y - mappedEyeY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    setErrorDistance(dist);
  }, [eyeData, unityCoords]);

  return (
    <View style={styles.container}>
      <BackButton />
      <SectionHeader title="Data Analysis & Fitting" />

      <View style={styles.content}>
        {eyeData ? (
          <>
            <Text style={styles.text}>👁 EyeData (raw): x = {eyeData.x}, y = {eyeData.y}</Text>
          </>
        ) : (
          <Text style={styles.text}>No EyeData Yet</Text>
        )}

        <Text style={styles.text}>
          📱 Unity Screen: x = {unityCoords.screen.x.toFixed(2)}, y = {unityCoords.screen.y.toFixed(2)}
        </Text>

        <Text style={styles.text}>
          📐 Fit Error Distance: {errorDistance.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default AnalysisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  content: {
    marginTop: 100,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 6,
    color: "#333",
  },
});
