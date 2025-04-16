// #include <Arduino.h>
// #include <WiFi.h>
// #include <ESPAsyncWebServer.h>
// #include <AsyncTCP.h>

// // WebSocket listening port
// const uint16_t WS_PORT = 8080;

// // WebServer instance
// AsyncWebServer server(WS_PORT);
// AsyncWebSocket ws("/ws");  // WebSocket path: ws://ESP32-IP:8080/ws

// // Initialize WebSocket
// void initWebSocket() {
//   ws.onEvent([](AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
//                 void *arg, uint8_t *data, size_t len) {
//     if (type == WS_EVT_CONNECT) {
//       Serial.printf("🔌 WebSocket client connected!: id=%u\n", client->id());
//     } else if (type == WS_EVT_DISCONNECT) {
//       Serial.printf("⚠️ WebSocket client disconnected: id=%u\n", client->id());
//     } else if (type == WS_EVT_DATA) {
//       // Receive data from client(not used in this case)
//     }
//   });
//   server.addHandler(&ws);
// }

// // Broadcast eye data to all connected clients
// void broadcastEyeData(const String& jsonData) {
//   ws.textAll(jsonData);
//   Serial.println("[WebSocket] ✅ now is broadcasting data: " + jsonData);
// }

// // Start WebSocket server
// void startWebSocketServer() {
//   initWebSocket();
//   server.begin();
//   Serial.printf("[WebSocket] 🚀 Server start succeesfully, listening to port：%d\n", WS_PORT);
// }
