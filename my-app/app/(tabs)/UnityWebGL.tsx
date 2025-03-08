import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

// 读取环境变量中的 WebGL 服务器地址
const WEBGL_URL = process.env.EXPO_PUBLIC_WEBGL_URL || "http://localhost:8080/index.html";

const UnityWebGLScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: WEBGL_URL }}  // ✅ 这里不再硬编码 URL，而是从 `.env` 获取
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

export default UnityWebGLScreen;
