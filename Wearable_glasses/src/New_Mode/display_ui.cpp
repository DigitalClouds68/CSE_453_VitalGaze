#include <Adafruit_SSD1306.h>
#include "project.h"

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
extern Mode selectedMode;
extern Mode currentMode;
extern bool isInSelectMode;

void Display_setup() {
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("⚠️ OLED 初始化失败！");
    delay(3000);
    return;
  }

  display.clearDisplay();
  display.display();  // 清屏

  // 不再显示 "Display ready"
}

void drawStatusBar() {
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.print("100%");  // 电池图标可在此处添加

  display.setCursor(50, 0);
  if (currentMode == ONLINE) {
    if (wifiStage == WIFI_CONNECTING) {
      display.print("WiFi: ...");  // 连接中
    } else if (connected) {
      display.print("WiFi: OK");    // 连接成功
    } else {
      display.print("WiFi: ERR");    // 连接失败
    }
  } else {
    display.print("WiFi: OFF");     // 其他模式下关闭 WiFi 显示
  }
}


void Display_blinkMode(Mode mode) {
  static unsigned long lastToggle = 0;
  static bool visible = true;

  if (millis() - lastToggle > 500) {
    visible = !visible;
    lastToggle = millis();
  }

  display.clearDisplay();
  drawStatusBar();

  display.setCursor(0, 16);
  if (visible) {
    display.print("Select: ");
    if (mode == ONLINE) display.print("ONLINE");
    else if (mode == SLEEP) display.print("SLEEP");
    else display.print("READER");
  }

  display.display();
}

void Display_confirmMode(Mode mode) {
  display.clearDisplay();
  drawStatusBar();
  display.setCursor(0, 16);
  display.print("Confirmed: ");
  if (mode == ONLINE) display.print("ONLINE");
  else if (mode == SLEEP) display.print("SLEEP");
  else display.print("READER");

  display.display();
}
void checkConsoleInput1() {
  if (!Serial.available()) return;

  String cmd = Serial.readStringUntil('\n');
  cmd.trim();

  if (isInSelectMode) {
    if (cmd == "yes") {
      currentMode = selectedMode;
      isInSelectMode = false;
      wifiStage = WIFI_IDLE;  // 重置 WiFi 状态机
      connected = false;
      Display_confirmMode(currentMode);
      Serial.print("✅ 模式已确认为: ");
      Serial.println(currentMode == ONLINE ? "ONLINE" : "READER");

    } else if (cmd == "no") {
      selectedMode = (selectedMode == ONLINE) ? READER : ONLINE;
      Serial.print("➡️ 切换到: ");
      Serial.println(selectedMode == ONLINE ? "ONLINE" : "READER");

    } else if (cmd == "off") {
      currentMode = SLEEP;
      isInSelectMode = false;
      wifiStage = WIFI_IDLE;
      connected = false;
      WiFi.disconnect(true);
      Display_confirmMode(SLEEP);
      LED_off();
      Serial.println("🛑 已返回 SLEEP 模式");

    } else {
      Serial.println("请输入 yes / no / off");
    }

  } else {
    if (cmd == "on") {
      isInSelectMode = true;
      selectedMode = ONLINE;
      wifiStage = WIFI_IDLE;
      connected = false;
      WiFi.disconnect(true);
      Serial.println("🔁 进入选择模式，请输入 yes / no / off");

    } else if (cmd == "change") {
      isInSelectMode = true;
      wifiStage = WIFI_IDLE;
      connected = false;
      WiFi.disconnect(true);
      Serial.println("🔁 返回选择模式");

    } else if (cmd == "off") {
      currentMode = SLEEP;
      isInSelectMode = false;
      wifiStage = WIFI_IDLE;
      connected = false;
      WiFi.disconnect(true);
      Display_confirmMode(SLEEP);
      LED_off();
      Serial.println("🛑 已切换至 SLEEP 模式");

    } else {
      Serial.println("当前已确认模式。请输入 change / off / on");
    }
  }
}
