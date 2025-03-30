#include <WiFi.h>

// 你自己的热点/路由器
const char* ssid = "Cloud";
const char* password = "00000000";

// 目标：发送给 App 或网页的 IP（先临时用调试服务器）
const char* host = "172.20.10.2";  // 改成你电脑或服务器 IP
const uint16_t port = 5000;

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

void sendEyeData(uint16_t x, uint16_t y, uint16_t w, uint16_t h) {
  WiFiClient client;

  if (!client.connect(host, port)) {
    Serial.println("[WiFi] ❌ Connection failed");
    return;
  }

  String json = String("{\"x\":") + x + ",\"y\":" + y + ",\"w\":" + w + ",\"h\":" + h + "}";

  client.println(json);
  client.stop();

  Serial.println("[WiFi] ✅ Data sent: " + json);
}
