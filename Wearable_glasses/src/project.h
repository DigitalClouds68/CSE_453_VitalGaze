#ifndef PROJECT_H
#define PROJECT_H

#include <Arduino.h>
#include <FastLED.h>           // WS2812B LED Strip
#include <Wire.h>              // I2C
#include <Adafruit_SSD1306.h>  // OLED
#include <WebSocketsClient.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <VL53L1X.h>           // Distance Sensor
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

// ==== Pin Config ====
#define NUM_LEDS 24
#define SCL_PIN 2
#define BUTTON_PIN 3
#define SDA_PIN 5
#define Voltreader 6
#define FAN_PIN 7
#define LEFT_LED_PIN 8
#define RIGHT_LED_PIN 9

// ==== App States & Modes ====
enum AppState { HOME_SCREEN, SELECTING_MODE, MODE_CONFIRMED };
enum Mode { ONLINE, SLEEP, READER };  // Formerly OFFLINE → READER

// ==== Shared Variables ====
extern AppState appState;
extern Mode currentMode;
extern Mode selectedMode;
extern volatile bool stopRequested;  // For interrupting LED animations

// ==== AI Camera ====
void AIcam_setup();
void AI_Detection();
bool isAIEnabled();  // AI Control

// ==== Distance Sensor ====
void Sensor_setup();
int get_distance_mm();

// ==== OLED Display ====
void Display_setup();
void Display_showHome();
void Display_blinkMode(Mode mode);
void Display_confirmMode(Mode mode);

// ==== LED Strip ====
void LED_setup();
void LED_off();
void LED_modeOnline();
void LED_modeReader();
void LED_clockwise();
void LED_counterclockwise();
void controlLED(const String& direction, int speed, int durationMs);

struct LEDConfig {
    String direction;
    int speed;
    int durationMs;
};

// ==== FSM / Button Handling ====
void FSM_setup();
void FSM_loop();

// ==== WebSocket ====
void initWebSocketClient();
void updateWebSocketLoop();
void sendEyeData(uint16_t x, uint16_t y, uint16_t w, uint16_t h);

// ==== Wi-Fi ====
void initWiFi();

// ==== BLE ====
void initBLE();
void notifyEyeData(uint16_t x, uint16_t y);

// ==== FAN ====
void temp_setup();
void Turnfan_on();
void Turnfan_off();

// ==== Volteage Reader ====

#endif  // PROJECT_H
