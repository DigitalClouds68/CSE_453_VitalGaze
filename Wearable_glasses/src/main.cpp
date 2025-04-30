#include <Arduino.h>
#include "main.h"

extern void AIcam_setup();
extern void AI_Detection();
extern void initWiFi();
extern void initWebSocketClient();
extern void updateWebSocketLoop();

void setup() {
    Serial.begin(115200);
    while(!Serial) { delay(10); }

    initWiFi();              // ▶️ 使用 WiFiManager 自动配网
    initWebSocketClient();   // ▶️ 连接云端 WebSocket
    AIcam_setup();           // ▶️ 相机 + 模型 初始化
}

void loop() {
    updateWebSocketLoop();   // ▶️ 保持 WebSocket 活动
    AI_Detection();          // ▶️ 每帧推理并发送坐标
}
