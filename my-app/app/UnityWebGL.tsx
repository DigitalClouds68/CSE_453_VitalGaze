import React, { useCallback, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  useRouter,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataContext } from "../contexts/DataContext";
import { useSocket } from "@/contexts/SocketContext";

const BASE_WEBGL_URL =
  process.env.EXPO_PUBLIC_WEBGL_URL ||
  "http://localhost:8080/index.html";

// 后端地址
const API_BASE_URL = "https://cse-453-vitalgaze-1.onrender.com";

const UnityWebGLScreen = () => {
  const { sendAICommand } = useSocket();
  const router = useRouter();

  // mode 可能是 "Fixation", "Saccade", "Pursuit" 或 "LED"
  const { mode } = useLocalSearchParams<{ mode: string }>();
  const finalURL = `${BASE_WEBGL_URL}?mode=${mode}`;

  const { unityCoords, setUnityCoords, eyeData } = useDataContext();

  // ① 记录训练开始时间（只在组件挂载时取一次）
  const [startTime] = useState(() => Date.now());

  // 保持屏幕横屏，卸载时恢复竖屏
  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      return () => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      };
    }, [])
  );

  // 计算 FitScore 百分比
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

    const score = 1 - dist / maxDist;
    fitScorePercent = Math.max(0, Math.min(1, score)) * 100;
  }

  // ③ 处理来自 Unity 的消息
  const handleMessageFromUnity = async ({
    nativeEvent: { data },
  }: {
    nativeEvent: { data: string };
  }) => {
    try {
      const msg = JSON.parse(data);

      // 游戏结束信号
      if (msg.type === "CLOSE_GAME") {
        // 停止 AI 推理
        sendAICommand("STOP_AI");

        // ② 计算训练时长（毫秒）和得分（0~100 整数）
        const endTime = Date.now();
        const durationMs = endTime - startTime;
        const score = Math.round(fitScorePercent);

        // 上传训练记录
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          fetch(`${API_BASE_URL}/api/training`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              trainingType: mode,
              duration: durationMs,
              score: score,
            }),
          }).catch((err) =>
            console.error("Upload training error:", err)
          );
        }

        // 返回训练模式选择页
        router.push("/(tabs)/mode");
        return;
      }

      // 坐标更新消息
      if (
        msg.data?.worldPosition &&
        msg.data?.screenPosition
      ) {
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
      } else {
        console.warn("⚠️ Invalid data structure:", msg);
      }
    } catch (error) {
      console.error("❌ JSON parsing error from Unity:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: finalURL }}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
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

      {/* 覆盖在 WebView 上方的小窗口，用于展示实时调试信息 */}
      <View
        style={{
          position: "absolute",
          top: 15,
          left: 15,
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", fontSize: 6 }}>
          🌍 World: x: {unityCoords.world.x.toFixed(2)}, y:{" "}
          {unityCoords.world.y.toFixed(2)}, z:{" "}
          {unityCoords.world.z.toFixed(2)}
        </Text>
        <Text style={{ color: "white", fontSize: 6 }}>
          📱 Screen: x: {unityCoords.screen.x.toFixed(2)}, y:{" "}
          {unityCoords.screen.y.toFixed(2)}
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
