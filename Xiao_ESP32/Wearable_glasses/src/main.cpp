#include <Arduino.h>
#include "main.h"

void setup() {
    Serial.begin(115200);
    initWiFi();       // ✅ 初始化 WiFi
    AIcam_setup();    // ✅ 初始化相机和模型
}

void loop() {
    AI_Detection();   // ✅ 循环检测并发送数据
}
