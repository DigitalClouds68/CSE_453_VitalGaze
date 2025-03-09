import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";

// 读取环境变量中的 WebGL 服务器地址
const WEBGL_URL = process.env.EXPO_PUBLIC_WEBGL_URL || "http://localhost:8080/index.html";

const UnityWebGLScreen = () => {
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

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: WEBGL_URL }}  // ✅ 这里不再硬编码 URL，而是从 `.env` 获取
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        allowsFullscreenVideo // 确保 WebGL 支持全屏模式
      />
    </View>
  );
};

export default UnityWebGLScreen;
