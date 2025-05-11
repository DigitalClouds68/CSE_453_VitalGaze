#include <Arduino.h>
#include "main.h"

extern void AIcam_setup();
extern void AI_Detection();
extern void initWiFi();
extern void initWebSocketClient();
extern void updateWebSocketLoop();
extern bool isAIEnabled();
extern void LED_setup();

void setup() {
  Serial.begin(115200);
  initWiFi();
  initWebSocketClient();
  AIcam_setup();
  LED_setup(); 
  fanSetup();
}

void loop() {
  updateWebSocketLoop();

  if (isAIEnabled()) {
    AI_Detection();
  } else {
    delay(50);
  }
}
