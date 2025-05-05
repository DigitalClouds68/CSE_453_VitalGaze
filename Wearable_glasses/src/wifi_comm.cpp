#include <WiFi.h>
#include <WebSocketsClient.h>

const char* ssid = "Cloud";
const char* password = "00000000";

WebSocketsClient webSocket;
bool aiEnabled = false; // 🔄 控制 AI 是否启用

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

// 初始化 WebSocket 客户端
void initWebSocketClient() {
  webSocket.beginSSL("vitalgaze-websocket-server.onrender.com", 443, "/");
  webSocket.setReconnectInterval(3000);

  webSocket.onEvent([](WStype_t type, uint8_t *payload, size_t length) {
    if (type == WStype_CONNECTED) {
      Serial.println("✅ Connected to Render WebSocket!");
    } else if (type == WStype_DISCONNECTED) {
      Serial.println("❌ Disconnected from WebSocket.");
    } else if (type == WStype_TEXT) {
      String msg = String((char*)payload).substring(0, length);
      Serial.println("[WebSocket] 📩 Received: " + msg);

      // 处理控制指令
      if (msg == "START_AI") {
        aiEnabled = true;
        Serial.println("🟢 AI Detection ENABLED");
      } else if (msg == "STOP_AI") {
        aiEnabled = false;
        Serial.println("🔴 AI Detection DISABLED");
      }
    }
  });
}

// 保持连接
void updateWebSocketLoop() {
  webSocket.loop();
}

// 向服务端发送眼动数据
void sendEyeData(uint16_t x, uint16_t y, uint16_t w, uint16_t h) {
  if (!aiEnabled) return; // ❌ 未启用时不发送数据

  String json = String("{\"x\":") + x + ",\"y\":" + y + ",\"w\":" + w + ",\"h\":" + h + "}";
  webSocket.sendTXT(json);
  Serial.println("[WebSocket] ✅ Sent: " + json);
}

// 暴露 aiEnabled 变量
bool isAIEnabled() {
  return aiEnabled;
}
