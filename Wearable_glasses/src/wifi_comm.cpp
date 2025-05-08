#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>
#include "project.h"

const char* ssid = "VitalGaze";
const char* password = "00000000";

WebSocketsClient webSocket;
bool aiEnabled = false; // Control AI detection state

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

      // ---- START_AI / STOP_AI ----
      if (msg == "START_AI") {
        aiEnabled = true;
        Serial.println("🟢 AI Detection ENABLED");
        return;
      } else if (msg == "STOP_AI" || msg == "{\"mode\":\"IDLE\"}") {
        aiEnabled = false;
        stopRequested = true;   // Interrupt LED animation
        LED_off();  // Stop LED animation
        Serial.println("🔴 AI Detection DISABLED & LED OFF");
        return;
      }

      // JSON Command for LED Control
      if (msg.startsWith("{")) {
        StaticJsonDocument<256> doc;
        DeserializationError err = deserializeJson(doc, msg);
        if (err) {
          Serial.println("⚠️ JSON parse error");
          return;
        }

        if (doc["mode"] == "LED") {
          String direction = doc["direction"] | "CW";
          int speed = doc["speed"] | 5;
          int duration = doc["duration"] | 3000;

          Serial.println("🔧 LED JSON Command:");
          Serial.println("  direction: " + direction);
          Serial.println("  speed: " + String(speed));
          Serial.println("  duration: " + String(duration));

          controlLED(direction, speed, duration);
        }
      }
    }
  });
}

// Maintain WebSocket connection
void updateWebSocketLoop() {
  webSocket.loop();
}

// sendEyeData() sends eye data to the server
void sendEyeData(uint16_t x, uint16_t y, uint16_t w, uint16_t h) {
  if (!aiEnabled) return;

  String json = String("{\"x\":") + x + ",\"y\":" + y + ",\"w\":" + w + ",\"h\":" + h + "}";
  webSocket.sendTXT(json);
  Serial.println("[WebSocket] ✅ Sent: " + json);
}

// Export the AI state to other files
bool isAIEnabled() {
  return aiEnabled;
}

void sendLEDAngle(int angle) {
  String msg = String("{\"type\":\"led_angle\",\"angle\":") + angle + "}";
  webSocket.sendTXT(msg);
}

