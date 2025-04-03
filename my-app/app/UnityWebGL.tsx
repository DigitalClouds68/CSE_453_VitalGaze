import React, { useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRouter, useFocusEffect } from "expo-router";
import { useDataContext } from "./contexts/DataContext";

const WEBGL_URL = process.env.EXPO_PUBLIC_WEBGL_URL || "http://localhost:8080/index.html";

const UnityWebGLScreen = () => {
  const router = useRouter();
  const { unityCoords, setUnityCoords, eyeData } = useDataContext(); // ❗ Get eyedata from global state

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
    }, [])
  );

  const handleMessageFromUnity = (event: { nativeEvent: { data: string } }) => {
    try {
      console.log("📩 Raw event data from WebView:", event.nativeEvent.data);
      const msg = JSON.parse(event.nativeEvent.data);

      if (msg.type === "CLOSE_GAME") {
        router.push("/training");
        return;
      }
      if (!msg.data || !msg.data.worldPosition || !msg.data.screenPosition) {
        console.warn("⚠️ Invalid data structure received:", msg);
        return;
      }

      // Save the coordinates to global state
      setUnityCoords({
        world: {
          x: msg.data.worldPosition.x || 0,
          y: msg.data.worldPosition.y || 0,
          z: msg.data.worldPosition.z || 0,
        },
        screen: {
          x: msg.data.screenPosition.x || 0,
          y: msg.data.screenPosition.y || 0,
        },
      });
    } catch (error) {
      console.error("❌ JSON parsing error from Unity:", error);
    }
  };

  // Calculate the distance between the eye data and Unity coordinates(Can be in render phase or useMemo)
  let fitScorePercent = 0;
  if (eyeData) {
    // 假设摄像头分辨率
    const cameraW = 320;
    const cameraH = 240;
    // 假设 Unity 屏幕分辨率
    const unityW = 3200;
    const unityH = 2000;

    const mappedEyeX = (eyeData.x / cameraW) * unityW;
    const mappedEyeY = unityH - (eyeData.y / cameraH) * unityH;

    const dx = unityCoords.screen.x - mappedEyeX;
    const dy = unityCoords.screen.y - mappedEyeY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // 选用"屏幕对角线"当作 maxDist
    const maxDist = Math.sqrt(unityW*unityW + unityH*unityH); 
    // Calculate the fit score
    let score = 1 - dist / maxDist;
    if (score < 0) score = 0;   // Lowest is 0
    if (score > 1) score = 1;   // Highest is 1
    fitScorePercent = score * 100;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: WEBGL_URL }}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        allowsFullscreenVideo
        injectedJavaScript={`
          (function() {
            window.sendCoordinates = (data) => {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: "COORDINATES", data }));
            };
            window.UnityCloseGame = () => {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: "CLOSE_GAME" }));
            };
            true;
          })();
        `}
        onMessage={handleMessageFromUnity}
      />

      {/* 显示来自 Unity 的坐标 + 拟合度 */}
      <View style={{
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 10,
        borderRadius: 5
      }}>
        {/* Unity 坐标 */}
        <Text style={{ color: "white", fontSize: 14 }}>
          🌍 World: x: {unityCoords.world.x.toFixed(2)}, y: {unityCoords.world.y.toFixed(2)}, z: {unityCoords.world.z.toFixed(2)}
        </Text>
        <Text style={{ color: "white", fontSize: 14 }}>
          📱 Screen: x: {unityCoords.screen.x.toFixed(2)}, y: {unityCoords.screen.y.toFixed(2)}
        </Text>

        {/* 眼睛坐标 (raw) */}
        {eyeData ? (
          <Text style={{ color: "white", fontSize: 14 }}>
            👁 Eye: x:{eyeData.x}, y:{eyeData.y}
          </Text>
        ) : (
          <Text style={{ color: "white", fontSize: 14 }}>
            No Eye Data
          </Text>
        )}

        {/* 映射后的拟合距离 */}
        <Text style={{ color: "white", fontSize: 14 }}>
        📐 FitScore: {fitScorePercent.toFixed(1)} %
        </Text>
      </View>
    </View>
  );
};

export default UnityWebGLScreen;
