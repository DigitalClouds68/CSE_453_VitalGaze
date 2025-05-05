#include <Arduino.h>
#include "main.h"

// 声明外部函数
extern void AIcam_setup();
extern void AI_Detection();
extern void initWiFi();
extern void initWebSocketClient();
extern void updateWebSocketLoop();
extern bool isAIEnabled(); // 新增

void setup() {
  Serial.begin(115200);
  initWiFi();
  initWebSocketClient();
  AIcam_setup();
}

void loop() {
  updateWebSocketLoop();

  if (isAIEnabled()) {
    AI_Detection();
  } else {
    delay(50); // 节省 CPU 占用
  }
}
