#ifndef PROJECT_H
#define PROJECT_H

#include <Arduino.h>
#include <FastLED.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <VL53L1X.h>
#include <WiFi.h>
#include <time.h>
#include <esp_sleep.h>

// ==== Pin Config ====
#define NUM_LEDS 24
#define BUTTON_PIN 0
#define FAN_PIN 3
#define LEFT_LED_PIN 8
#define RIGHT_LED_PIN 9

#define WIFI_SSID "VitalGaze"
#define WIFI_PASSWORD "00000000"

// ==== App States & Modes ====
enum AppState {
  HOME_SCREEN,
  SELECTING_MODE,
  MODE_CONFIRMED,
  MODE_READING,
  MODE_CONNECT_PHONE,
  MODE_IDLE
};

enum Mode { ONLINE, SLEEP, READER };

enum WiFiConnectStage {
  WIFI_IDLE,
  WIFI_SCANNING,
  WIFI_CONNECTING
};

// ==== Shared Variables ====
extern AppState appState;
extern Mode currentMode;
extern Mode selectedMode;
extern Adafruit_SSD1306 display;
extern bool isInSelectMode;
extern WiFiConnectStage wifiStage;
extern unsigned long wifiStartTime;
extern bool connected;
extern volatile bool stopRequested;

void initWebSocketClient();

// ==== Distance Sensor ====
void Sensor_setup();
int  get_distance_mm();

// ==== OLED 显示 ====
void Display_setup();
void Display_showHome(Mode mode);
void Display_blinkMode(Mode mode);
void Display_confirmMode(Mode mode);
void drawStatusBar();
void checkConsoleInput1();

// ==== LED Strip ====
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

// ==== 模式控制 ====
void handleMode();
void handleWiFiConnection();
void readerModeLoop();

// ==== Fan Control ====
void fanSetup();   // 上电初始化并让风扇一直转
void fanOn();      // 手动开启风扇（可选）
void fanOff();     // 手动关闭风扇（可选）

#endif // PROJECT_H
