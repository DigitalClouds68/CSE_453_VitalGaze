#include <WiFi.h>
#include <WebSocketsClient.h>

// WiFi credentials
const char* ssid = "Cloud";
const char* password = "00000000";

// WebSocket client实例
WebSocketsClient webSocket;

// 初始化 WiFi
void initWiFi() {
  Serial.println("[WiFi] Connecting...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n[WiFi] Connected!");
  Serial.print("[WiFi] IP: ");
  Serial.println(WiFi.localIP());
}

// 初始化 WebSocket Client（连接到 Render 云服务器）
void initWebSocketClient() {
  // WebSocket client 连接到 Render Cloud Server
  webSocket.beginSSL("vitalgaze-websocket-server.onrender.com", 443, "/");  // 使用 WSS
  webSocket.setReconnectInterval(3000); // 自动重连

  webSocket.onEvent([](WStype_t type, uint8_t *payload, size_t length) {
    if (type == WStype_CONNECTED) {
      Serial.println("✅ Connected to Render WebSocket!");
    } else if (type == WStype_DISCONNECTED) {
      Serial.println("❌ Disconnected from WebSocket.");
    }
  });
}

// 循环中需要调用
void updateWebSocketLoop() {
  webSocket.loop();
}

// ✅ 实际发送数据
void sendEyeData(uint16_t x, uint16_t y, uint16_t w, uint16_t h) {
  String json = String("{\"x\":") + x + ",\"y\":" + y + ",\"w\":" + w + ",\"h\":" + h + "}";
  webSocket.sendTXT(json);
  Serial.println("[WebSocket] ✅ Sent: " + json);
}
