#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>

// WebSocket服务器监听端口
const uint16_t WS_PORT = 8080;

// WebServer 实例
AsyncWebServer server(WS_PORT);
AsyncWebSocket ws("/ws");  // WebSocket端点路径: ws://ESP32-IP:8080/ws

// 初始化 WebSocket 服务
void initWebSocket() {
  ws.onEvent([](AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
                void *arg, uint8_t *data, size_t len) {
    if (type == WS_EVT_CONNECT) {
      Serial.printf("🔌 WebSocket客户端连接成功: id=%u\n", client->id());
    } else if (type == WS_EVT_DISCONNECT) {
      Serial.printf("⚠️ WebSocket客户端断开: id=%u\n", client->id());
    } else if (type == WS_EVT_DATA) {
      // 收到数据（目前用不到）
    }
  });
  server.addHandler(&ws);
}

// 广播数据给所有连接的客户端
void broadcastEyeData(const String& jsonData) {
  ws.textAll(jsonData);
  Serial.println("[WebSocket] ✅ 已广播数据: " + jsonData);
}

// 启动 WebSocket 服务器
void startWebSocketServer() {
  initWebSocket();
  server.begin();
  Serial.printf("[WebSocket] 🚀 服务器启动成功，监听端口：%d\n", WS_PORT);
}
