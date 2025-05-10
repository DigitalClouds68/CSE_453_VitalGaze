#include <Arduino.h>
#include "main.h"
#include "project.h"

bool isInSelectMode = false;

extern void AIcam_setup();
extern void AI_Detection();
extern void initWiFi();
extern void initWebSocketClient();
extern void updateWebSocketLoop();
//extern void initBLE();
extern bool isAIEnabled();
extern void LED_setup();

void setup() {
  Serial.begin(115200);
  initWiFi();
  initWebSocketClient();
  AIcam_setup();
  //initBLE();
  LED_setup(); 

  /////NEW ADDED///
  /////////////////
  Sensor_setup();
  Display_setup();

  fanSetup();
  
  Display_confirmMode(SLEEP);  // 默认显示 OFF 状态
  Serial.println("🛑 当前为关闭状态。输入 on 开始模式选择。");
  ////////////////
}

void loop() {
  updateWebSocketLoop();

  if (isAIEnabled()) {
    AI_Detection();
  } else {
    delay(50);
  }

  ////NEW ADDED///
  ///////////////
  checkConsoleInput1();  // 最优先处理输入

  if (isInSelectMode) {
    Display_blinkMode(selectedMode);  // 显示选项
    LED_modeOnline();                 // 选择状态使用橙灯
    return;
  }

  handleMode();  // 根据 currentMode 决定逻辑（READER / ONLINE / SLEEP）
  //////////////
}
