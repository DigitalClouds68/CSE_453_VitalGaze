import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRouter, useFocusEffect } from "expo-router"; // ✅ from expo-router

const WEBGL_URL = process.env.EXPO_PUBLIC_WEBGL_URL || "http://localhost:8080/index.html";

const UnityWebGLScreen = () => {
  // ✅ 使用 useRouter() 来做导航
  const router = useRouter();

  const [coordinates, setCoordinates] = useState({
    world: { x: 0, y: 0, z: 0 },
    screen: { x: 0, y: 0 },
  });

  useFocusEffect(
    useCallback(() => {
      // 每次进入页面时都锁横屏
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  
      // 可选：离开时恢复竖屏（如果不在 training 页面已经做了）
      return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
    }, [])
  );

  // 处理 Unity 发来的消息
  const handleMessageFromUnity = (event: { nativeEvent: { data: string } }) => {
    try {
      console.log("📩 Raw event data from WebView:", event.nativeEvent.data);
      const msg = JSON.parse(event.nativeEvent.data);

      // ★ 如果类型是 CLOSE_GAME，就跳转到 /training
      if (msg.type === "CLOSE_GAME") {
        console.log("✅ Received CLOSE_GAME from Unity. Going to /training page...");
        // 这里改成 router.push("/training")
        router.push("/training");
        return;
      }

      // 否则解析坐标
      if (!msg.worldPosition || !msg.screenPosition) {
        console.warn("⚠️ Invalid data structure received:", msg);
        return;
      }

      setCoordinates({
        world: {
          x: msg.worldPosition.x || 0,
          y: msg.worldPosition.y || 0,
          z: msg.worldPosition.z || 0,
        },
        screen: {
          x: msg.screenPosition.x || 0,
          y: msg.screenPosition.y || 0,
        },
      });
      console.log("✅ Successfully updated coordinates:", msg);
    } catch (error) {
      console.error("❌ JSON parsing error from Unity:", error);
    }
  };

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
        onMessage={handleMessageFromUnity}
        injectedJavaScript={`
          if (!window.sendCoordinates) {
            console.log("✅ Injecting sendCoordinates function into WebView...");
            window.sendCoordinates = (data) => {
              console.log("📡 Sending data to React Native:", data);
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            };

          // 这里新增 UnityCloseGame
          if (!window.UnityCloseGame) {
            window.UnityCloseGame = () => {
              console.log("📡 Unity calls: window.UnityCloseGame()");
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: "CLOSE_GAME"
                }));
              }
            };
          }

          console.log("✅ Injected JavaScript executed.");
          true;
        `}
      />

      {/* 显示来自 Unity 的坐标 */}
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