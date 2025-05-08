#include <FastLED.h>
#include "project.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

extern void updateWebSocketLoop();
extern void sendLEDAngle(int angle); // 👈 声明外部函数

CRGB ledsLeft[NUM_LEDS];
CRGB ledsRight[NUM_LEDS];
volatile bool stopRequested = false;
TaskHandle_t ledTaskHandle = NULL;

void LED_setup() {
  FastLED.addLeds<WS2812B, LEFT_LED_PIN, RGB>(ledsLeft, NUM_LEDS);
  FastLED.addLeds<WS2812B, RIGHT_LED_PIN, RGB>(ledsRight, NUM_LEDS);
  FastLED.clear(); FastLED.show();
}

void LED_off() {
  fill_solid(ledsLeft, NUM_LEDS, CRGB::Black);
  fill_solid(ledsRight, NUM_LEDS, CRGB::Black);
  FastLED.show();
}

void LED_animationTask(void* param) {
  auto config = *(reinterpret_cast<LEDConfig*>(param));
  delete reinterpret_cast<LEDConfig*>(param);

  int frameDelay = (config.speed <= 1) ? 200 :
                   (config.speed <= 3) ? 120 :
                   (config.speed <= 5) ?  80 :
                   (config.speed <= 7) ?  40 : 20;

  unsigned long start = millis();
  int i = (config.direction == "CW") ? 0 : NUM_LEDS - 1;

  while (!stopRequested && millis() - start < (unsigned long)config.durationMs) {
    fill_solid(ledsLeft, NUM_LEDS, CRGB::Black);
    fill_solid(ledsRight, NUM_LEDS, CRGB::Black);
    ledsLeft[i]  = CRGB::Yellow;
    ledsRight[i] = CRGB::Yellow;
    FastLED.show();

    // 👉 计算 LED 当前角度（假设 360° 均匀分布）
    int angle = (int)(i * 360.0 / NUM_LEDS);
    sendLEDAngle(angle);

    unsigned long t = millis();
    while (!stopRequested && millis() - t < frameDelay) {
      updateWebSocketLoop();
      delay(5);
    }

    i = (config.direction == "CW") ? (i + 1) % NUM_LEDS : (i - 1 + NUM_LEDS) % NUM_LEDS;
    yield();
  }

  LED_off();
  ledTaskHandle = NULL;
  vTaskDelete(NULL);
}

void controlLED(const String& direction, int speed, int durationMs) {
  stopRequested = true;
  delay(20);
  if (ledTaskHandle) vTaskDelete(ledTaskHandle);

  stopRequested = false;
  LEDConfig* config = new LEDConfig{direction, speed, durationMs};
  xTaskCreatePinnedToCore(LED_animationTask, "LEDTask", 4096, config, 1, &ledTaskHandle, 1);
}
