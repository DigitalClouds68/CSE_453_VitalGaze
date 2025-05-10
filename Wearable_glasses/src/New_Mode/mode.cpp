#include "project.h"
#include <WiFi.h>

WiFiConnectStage wifiStage = WIFI_IDLE;
unsigned long wifiStartTime = 0;
bool connected = false;

void handleMode() {
  if (isInSelectMode) {
    LED_modeOnline();  // 闪烁橙灯
    return;
  }

  switch (currentMode) {
    case READER:
      readerModeLoop();
      break;

    case ONLINE:
      handleWiFiConnection();  // 使用状态机处理 WiFi 连接
      break;

    case SLEEP:
    default:
      LED_off();  // 全部关闭
      break;
  }
}

void handleWiFiConnection() {
  switch (wifiStage) {
    case WIFI_IDLE:
      Serial.println("📡 开始扫描网络...");
      WiFi.disconnect(true);   // 清除旧连接
      delay(100);
      WiFi.mode(WIFI_STA);     // 设置为 Station 模式
      delay(100);
      WiFi.scanNetworks(true); // 异步扫描
      wifiStage = WIFI_SCANNING;
      wifiStartTime = millis();
      break;

    case WIFI_SCANNING: {
      if (millis() - wifiStartTime < 2000) break;  // 至少等待2秒

      int result = WiFi.scanComplete();
      if (result == WIFI_SCAN_FAILED) {
        Serial.println("⚠️ 扫描失败 (-2)");
        wifiStage = WIFI_IDLE;

      } else if (result == WIFI_SCAN_RUNNING) {
        // 继续等待扫描完成
        break;

      } else if (result == 0) {
        Serial.println("⚠️ 没有找到任何网络");
        wifiStage = WIFI_IDLE;

      } else {
        Serial.printf("✅ 找到 %d 个网络：\n", result);
        for (int i = 0; i < result; ++i) {
          Serial.printf("  📶 %s (%ddBm)\n", WiFi.SSID(i).c_str(), WiFi.RSSI(i));
        }

        Serial.println("🚀 开始连接目标 WiFi...");
        WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
        wifiStage = WIFI_CONNECTING;
        wifiStartTime = millis();
      }
      break;
    }

    case WIFI_CONNECTING:
      if (WiFi.status() == WL_CONNECTED) {
        Serial.println("✅ WiFi 连接成功！");
        Serial.print("IP 地址: ");
        Serial.println(WiFi.localIP());
        connected = true;
        LED_solidBlue();

      } else if (millis() - wifiStartTime > 10000) {
        Serial.println("❌ WiFi 连接超时");
        wifiStage = WIFI_IDLE;
        connected = false;
        LED_modeTooClose();

      } else {
        LED_blinkBlue();  // 正在连接中
      }
      break;
  }
}

void readerModeLoop() {
  static unsigned long readerStartTime = 0;
  static bool inRestPeriod = false;
  static unsigned long restStartTime = 0;

  int dist = get_distance_mm();

  if (!inRestPeriod) {
    if (readerStartTime == 0) {
      readerStartTime = millis();
      Serial.print("📖 Reader mode started at: ");
      Serial.println(readerStartTime);
    }

    if (dist > 0 && dist < 200) {
      LED_modeTooClose();
    } else {
      LED_modeReader();
    }

    // ⏱️ 测试版本：30秒后进入休息
    if (millis() - readerStartTime >= 30000) {
      inRestPeriod = true;
      restStartTime = millis();
      readerStartTime = 0;

      Serial.println("⏸ Entering 20s rest period");

      display.clearDisplay();
      drawStatusBar();
      display.setCursor(0, 16);
      display.setTextSize(1);
      display.setTextColor(SSD1306_WHITE);
      display.print("Rest your eyes");
      display.display();
    }

  } else {
    LED_modeTooClose();

    if (millis() - restStartTime >= 20000) {
      inRestPeriod = false;

      Serial.println("✅ Rest period ended, back to reading");

      display.clearDisplay();
      drawStatusBar();
      display.setCursor(0, 16);
      display.setTextSize(1);
      display.setTextColor(SSD1306_WHITE);
      display.print("Confirmed: READER");
      display.display();
    }
  }
}
