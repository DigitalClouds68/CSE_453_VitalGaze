#include <Arduino.h>
#include "main.h"

extern void AIcam_setup();
extern void AI_Detection();
extern void initWiFi();
extern void initWebSocketClient();
extern void updateWebSocketLoop(); // ✅ 新增！

void setup() {
    Serial.begin(115200);
    initWiFi();              // ✅ 初始化 WiFi
    initWebSocketClient();   // ✅ 初始化 WebSocket Client（连接云端）
    AIcam_setup();           // ✅ 初始化摄像头 + 模型
}

void loop() {
    updateWebSocketLoop();   // ✅ 必须轮询保持连接
    AI_Detection();          // ✅ 每帧推理并发送坐标
}
