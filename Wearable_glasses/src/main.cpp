#include <Arduino.h>
#include "main.h"

extern void AIcam_setup();
extern void AI_Detection();
extern void initWiFi();
extern void startWebSocketServer(); // WebSocket

void setup() {
    Serial.begin(115200);
    initWiFi();       // ✅ 初始化 WiFi
    AIcam_setup();    // ✅ 初始化相机和模型
    startWebSocketServer();  // ✅ 初始化WebSocket服务器
}

void loop() {
    AI_Detection();   // ✅ 循环检测并发送数据
}
