import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";

// 读取 WebGL 服务器地址
const WEBGL_URL = process.env.EXPO_PUBLIC_WEBGL_URL || "http://localhost:8080/index.html";

const UnityWebGLScreen = () => {
  const [coordinates, setCoordinates] = useState({
    world: { x: 0, y: 0, z: 0 },
    screen: { x: 0, y: 0 },
  });

  useEffect(() => {
    // 进入 WebGL 页面时切换横屏
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();

    // 退出 WebGL 页面时恢复竖屏
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  // 处理 Unity 传来的数据
  const handleMessageFromUnity = (event: { nativeEvent: { data: string } }) => {
    try {
      console.log("📩 Raw event data from WebView:", event.nativeEvent.data);
      
      const data = JSON.parse(event.nativeEvent.data);

      // ✅ 确保数据结构正确
      if (!data.worldPosition || !data.screenPosition) {
        console.warn("⚠️ Invalid data structure received:", data);
        return;
      }

      setCoordinates({
        world: {
          x: data.worldPosition.x || 0,
          y: data.worldPosition.y || 0,
          z: data.worldPosition.z || 0,
        },
        screen: {
          x: data.screenPosition.x || 0,
          y: data.screenPosition.y || 0,
        },
      });

      console.log("✅ Successfully updated coordinates:", data);
    } catch (error) {
      console.error("❌ JSON parsing error from Unity:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: WEBGL_URL }}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        allowsFullscreenVideo
        onMessage={handleMessageFromUnity}
        injectedJavaScript={`
          if (!window.sendCoordinates) {
            console.log("✅ Injecting sendCoordinates function into WebView...");

            window.sendCoordinates = (data) => {
              console.log("📡 Sending data to React Native:", data);
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            };

            setInterval(() => {
              const simulatedData = {
                worldPosition: { x: Math.random() * 10, y: Math.random() * 10, z: 0 },
                screenPosition: { x: Math.random() * 500, y: Math.random() * 500 }
              };
              console.log("🔹 Simulated Unity Data:", simulatedData);
              window.sendCoordinates(simulatedData);
            }, 1000);
          }
          console.log("✅ Injected JavaScript executed.");
          true;
        `}
      />
      
      {/* 显示 Unity 传来的坐标 */}
      <View style={{
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 10,
        borderRadius: 5
      }}>
        <Text style={{ color: "white", fontSize: 16 }}>
          🌍 World: x: {coordinates.world.x.toFixed(2)}, y: {coordinates.world.y.toFixed(2)}, z: {coordinates.world.z.toFixed(2)}
        </Text>
        <Text style={{ color: "white", fontSize: 16 }}>
          📱 Screen: x: {coordinates.screen.x.toFixed(2)}, y: {coordinates.screen.y.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default UnityWebGLScreen;
