#ifndef PROJECT_H
#define PROJECT_H

#include <Arduino.h>
#include <FastLED.h>           // WS2812B 灯带
#include <Wire.h>              // I2C 通讯
#include <Adafruit_SSD1306.h>  // OLED 显示屏
#include <VL53L1X.h>           // 距离传感器
#include <WiFi.h>              // WiFi 通讯
#include <time.h>
#include <esp_sleep.h>         // 睡眠模式支持

// ==== Pin 配置 ====
#define NUM_LEDS 24
#define BUTTON_PIN 0
#define FAN_PIN 7
#define LEFT_LED_PIN 8  // 如需兼容旧版请设为2
#define RIGHT_LED_PIN 9 // 如需兼容旧版请设为4

// ==== WiFi 配置 ====
#define WIFI_SSID "VitalGaze"
#define WIFI_PASSWORD "00000000"

enum WiFiConnectStage {
  WIFI_IDLE,
  WIFI_SCANNING,
  WIFI_CONNECTING
};

// ==== App 状态 ====
enum AppState {
  HOME_SCREEN,
  SELECTING_MODE,
  MODE_CONFIRMED,
  MODE_READING,
  MODE_CONNECT_PHONE,
  MODE_IDLE
};

enum Mode {
  ONLINE,
  SLEEP,
  READER
};

// ==== 全局共享状态变量 ====
extern AppState appState;
extern Mode currentMode;
extern Mode selectedMode;
extern Adafruit_SSD1306 display;
extern bool isInSelectMode;
extern WiFiConnectStage wifiStage;
extern unsigned long wifiStartTime;
extern bool connected;
extern volatile bool stopRequested;

// ==== 距离传感器 ====
void Sensor_setup();
int get_distance_mm();

// ==== OLED 显示 ====
void Display_setup();
void Display_showHome(Mode mode);
void Display_blinkMode(Mode mode);
void Display_confirmMode(Mode mode);
void Display_showMode(Mode mode);  // 可选实现
void drawStatusBar();
void checkConsoleInput1();

// ==== LED 控制 ====
void LED_setup();
void LED_off();
void LED_modeOnline();
void LED_modeReader();
void LED_clockwise();
void LED_counterclockwise();
void LED_modeTooClose();
void LED_blinkBlue();
void LED_solidBlue();
void controlLED(const String& direction, int speed, int durationMs);

struct LEDConfig {
  String direction;
  int speed;
  int durationMs;
};

// ==== 按钮状态机 ====
void FSM_setup();
void FSM_loop();

// ==== 模式控制 ====
void handleMode();
void handleWiFiConnection();
void readerModeLoop();
void scanWiFiNetworks();     // 可选
bool connectToWiFi();        // 可选
void checkConsoleInput();    // 可选

// ==== 风扇控制 ====
void fanSetup();   // 上电初始化并启动
void fanOn();      // 手动开启风扇
void fanOff();     // 手动关闭风扇

// ==== 网络 ====
void initWebSocketClient();

#endif // PROJECT_H
