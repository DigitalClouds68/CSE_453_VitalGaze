import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const UnityWebGLScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "http://10.12.70.3:8080/index.html" }} // ← 替换为你的 IP
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

export default UnityWebGLScreen;
