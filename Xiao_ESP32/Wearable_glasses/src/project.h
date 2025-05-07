#ifndef PROJECT_H
#define PROJECT_H

#include <Arduino.h>
#include <FastLED.h>   // For WS2812B
#include <Wire.h>                // I2C
#include <Adafruit_SSD1306.h>    // OLED
#include <VL53L1X.h>             // Distance sensor

// ==== Pin Config ====
#define NUM_LEDS 24
#define BUTTON_PIN 0
#define FAN_PIN 2
// #define SCL_PIN 4
// #define SCL_PIN 5
#define LEFT_LED_PIN 2
#define RIGHT_LED_PIN 4

// ==== App States & Modes ====
enum AppState { HOME_SCREEN, SELECTING_MODE, MODE_CONFIRMED };
enum Mode { ONLINE, SLEEP, READER }; // Formerly OFFLINE → READER

// ==== Shared Variables ====
extern AppState appState;
extern Mode currentMode;
extern Mode selectedMode;

// ==== AI Camera ====
void AIcam_setup();
void AIcam_detect();

// ==== Distance Sensor ====
void Sensor_setup();
int  get_distance_mm();

// ==== OLED Display ====
void Display_setup();
void Display_showHome(Mode mode);
void Display_blinkMode(Mode mode);
void Display_confirmMode(Mode mode);

// ==== LED Strip ====
void LED_setup();
void LED_off();
void LED_modeOnline();
void LED_modeReader();
void LED_clockwise();
void LED_clockwise();
void LED_counterclockwise();

// ==== FSM / Button Handling ====
void FSM_setup();
void FSM_loop();

#endif // PROJECT_H