import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDataContext } from "../../contexts/DataContext";

const AnalysisScreen = () => {
  const { eyeData, unityCoords } = useDataContext();
  const [errorDistance, setErrorDistance] = useState(0);

  useEffect(() => {
    if (!eyeData) return;

    // 相机分辨率
    const camW = 320;
    const camH = 240;
    // Unity屏幕分辨率(假设)
    const unityW = 3200;
    const unityH = 2000;

    // 将ESP32坐标映射到Unity屏幕坐标
    const mappedEyeX = (eyeData.x / camW) * unityW;
    const mappedEyeY = unityH - (eyeData.y / camH) * unityH;

    // 计算误差
    const dx = unityCoords.screen.x - mappedEyeX;
    const dy = unityCoords.screen.y - mappedEyeY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    setErrorDistance(dist);

  }, [eyeData, unityCoords]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Analysis & Fitting</Text>
      <View style={{ marginTop: 20 }}>
        {eyeData ? (
          <>
            <Text style={styles.text}>EyeData (raw): x={eyeData.x}, y={eyeData.y}</Text>
          </>
        ) : (
          <Text style={styles.text}>No EyeData Yet</Text>
        )}

        <Text style={styles.text}>
          Unity Screen: x={unityCoords.screen.x.toFixed(2)}, y={unityCoords.screen.y.toFixed(2)}
        </Text>

        <Text style={styles.text}>
          Fit Error Distance: {errorDistance.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default AnalysisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#F5F5F5", padding: 20, alignItems: "center", justifyContent: "center",
  },
  title: {
    fontSize: 22, fontWeight: "bold", color: "#1E567D",
  },
  text: {
    fontSize: 16, marginVertical: 5, color: "#333",
  },
});
