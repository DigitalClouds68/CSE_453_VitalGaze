import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDataContext } from "../../contexts/DataContext";
import BackButton from "@/components/BackButton";
import SectionHeader from "@/components/SectionHeader";

const AnalysisScreen = () => {
  const { eyeData, unityCoords } = useDataContext();
  const [currentError, setCurrentError] = useState(0);
  const [avgError, setAvgError] = useState(0);
  const errorHistory = useRef<number[]>([]); // 📌 历史误差记录

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

    // 更新当前误差和历史
    setCurrentError(dist);
    errorHistory.current.push(dist);
    if (errorHistory.current.length > 100) {
      errorHistory.current.shift(); // 限制为最多100条
    }

    // 更新平均误差
    const sum = errorHistory.current.reduce((a, b) => a + b, 0);
    setAvgError(sum / errorHistory.current.length);
  }, [eyeData, unityCoords]);

  const matchScore = Math.max(0, 1 - avgError / 1000); // 可调因子

  return (
    <View style={styles.container}>
      <BackButton />
      <SectionHeader title="Data Analysis & Fitting" />
      <View style={styles.content}>
        <Text style={styles.text}>
          👁 EyeData: {eyeData ? `x=${eyeData.x}, y=${eyeData.y}` : "No data yet"}
        </Text>
        <Text style={styles.text}>
          🎯 Unity Target: x={unityCoords.screen.x.toFixed(1)}, y={unityCoords.screen.y.toFixed(1)}
        </Text>
        <Text style={styles.text}>
          📐 Current Error Distance: {currentError.toFixed(2)}
        </Text>
        <Text style={styles.text}>
          📈 Avg Error (last {errorHistory.current.length}): {avgError.toFixed(2)}
        </Text>
        <Text style={styles.text}>
          💡 Fitting Score: {(matchScore * 100).toFixed(1)}%
        </Text>
      </View>
    </View>
  );
};

export default AnalysisScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
  content: { marginTop: 80, alignItems: "center" },
  text: { fontSize: 16, marginVertical: 6, color: "#333" },
});
