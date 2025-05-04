#include <WiFi.h>
#include <WebSocketsClient.h>

// WiFi credentials
// Change it to your own WiFi credentials
const char* ssid = "Cloud";
const char* password = "00000000";

// WebSocket client
WebSocketsClient webSocket;

// Initialize WiFi
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

// Initialize WebSocket Client
void initWebSocketClient() {
  // WebSocket client connect to Render Cloud Server
  webSocket.beginSSL("vitalgaze-websocket-server.onrender.com", 443, "/");  // WSS
  webSocket.setReconnectInterval(3000); // auto reconnect every 3 seconds if disconnected

  webSocket.onEvent([](WStype_t type, uint8_t *payload, size_t length) {
    if (type == WStype_CONNECTED) {
      Serial.println("✅ Connected to Render WebSocket!");
    } else if (type == WStype_DISCONNECTED) {
      Serial.println("❌ Disconnected from WebSocket.");
    }
  });
}

// Loop function to keep WebSocket connection alive
void updateWebSocketLoop() {
  webSocket.loop();
}

// real-time send eye data to Render Cloud
void sendEyeData(uint16_t x, uint16_t y, uint16_t w, uint16_t h) {
  String json = String("{\"x\":") + x + ",\"y\":" + y + ",\"w\":" + w + ",\"h\":" + h + "}";
  webSocket.sendTXT(json);
  Serial.println("[WebSocket] ✅ Sent: " + json);
}
