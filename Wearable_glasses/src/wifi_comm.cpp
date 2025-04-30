#include <WiFiManager.h>      // ← 新增
#include <WebSocketsClient.h>

// WebSocket client实例
WebSocketsClient webSocket;

// 将 initWiFi() 改为用 WiFiManager
void initWiFi() {
  Serial.println("[WiFi] 启动 WiFiManager 配网...");
  WiFiManager wm;
  wm.setDebugOutput(true);
  wm.setConfigPortalTimeout(180);                // 超时后走默认逻辑
  // 如果要清除以前的配网记录：wm.resetSettings();

  // autoConnect(热点 SSID, 热点密码)
  if(!wm.autoConnect("VitalGaze-AP", "vital1234")) {
    Serial.println("⚠️ 配网超时或失败，3秒后重启");
    delay(3000);
    ESP.restart();
  }

  Serial.println("\n✅ WiFi 配网成功！");
  Serial.print("[WiFi] IP = ");
  Serial.println(WiFi.localIP());
}

// 保留原有的 WebSocket 初始化
void initWebSocketClient() {
  webSocket.beginSSL("vitalgaze-websocket-server.onrender.com", 443, "/");  // 使用 WSS
  webSocket.setReconnectInterval(3000);
  webSocket.onEvent([](WStype_t type, uint8_t *payload, size_t length) {
    if (type == WStype_CONNECTED) {
      Serial.println("✅ Connected to Render WebSocket!");
    } else if (type == WStype_DISCONNECTED) {
      Serial.println("❌ Disconnected from WebSocket.");
    }
  });
}

void updateWebSocketLoop() {
  webSocket.loop();
}

void sendEyeData(uint16_t x, uint16_t y, uint16_t w, uint16_t h) {
  String json = String("{\"x\":") + x + 
                ",\"y\":" + y + 
                ",\"w\":" + w + 
                ",\"h\":" + h + "}";
  webSocket.sendTXT(json);
  Serial.println("[WebSocket] ✅ Sent: " + json);
}
