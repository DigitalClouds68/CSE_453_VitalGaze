import React, { useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useDataContext } from "../contexts/DataContext";

import { useSocket } from "@/contexts/SocketContext";

const BASE_WEBGL_URL = process.env.EXPO_PUBLIC_WEBGL_URL || "http://localhost:8080/index.html";

const UnityWebGLScreen = () => {
  const { sendAICommand } = useSocket();
  
  const router = useRouter();
  const { mode } = useLocalSearchParams(); // 👈 Read the mode sent from training.tsx
  const finalURL = `${BASE_WEBGL_URL}?mode=${mode}`;

  const { unityCoords, setUnityCoords, eyeData } = useDataContext();

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
      const msg = JSON.parse(event.nativeEvent.data);

      if (msg.type === "CLOSE_GAME") {
        sendAICommand("STOP_AI"); // ✅ 通过 SocketContext 关闭 AI
        router.push("/trainingPage/training");
        return;
      }      

      if (!msg.data || !msg.data.worldPosition || !msg.data.screenPosition) {
        console.warn("⚠️ Invalid data structure received:", msg);
        return;
      }

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

  let fitScorePercent = 0;
  if (eyeData) {
    const cameraW = 320;
    const cameraH = 240;
    const unityW = 3200;
    const unityH = 2000;

    const mappedEyeX = (eyeData.x / cameraW) * unityW;
    const mappedEyeY = unityH - (eyeData.y / cameraH) * unityH;

    const dx = unityCoords.screen.x - mappedEyeX;
    const dy = unityCoords.screen.y - mappedEyeY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.sqrt(unityW * unityW + unityH * unityH);

    let score = 1 - dist / maxDist;
    fitScorePercent = Math.max(0, Math.min(1, score)) * 100;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: finalURL }}
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

      <View style={{
        position: "absolute",
        top: 15,
        left: 15,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 10,
        borderRadius: 5
      }}>
        <Text style={{ color: "white", fontSize: 6 }}>
          🌍 World: x: {unityCoords.world.x.toFixed(2)}, y: {unityCoords.world.y.toFixed(2)}, z: {unityCoords.world.z.toFixed(2)}
        </Text>
        <Text style={{ color: "white", fontSize: 6 }}>
          📱 Screen: x: {unityCoords.screen.x.toFixed(2)}, y: {unityCoords.screen.y.toFixed(2)}
        </Text>
        {eyeData ? (
          <Text style={{ color: "white", fontSize: 6 }}>
            👁 Eye: x:{eyeData.x}, y:{eyeData.y}
          </Text>
        ) : (
          <Text style={{ color: "white", fontSize: 6 }}>
            No Eye Data
          </Text>
        )}
        <Text style={{ color: "white", fontSize: 6 }}>
          📐 FitScore: {fitScorePercent.toFixed(1)} %
        </Text>
      </View>
    </View>
  );
};

export default UnityWebGLScreen;
