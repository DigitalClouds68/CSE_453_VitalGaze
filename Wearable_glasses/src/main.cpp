#include <Arduino.h>
#include "main.h"

extern void AIcam_setup();
extern void AI_Detection();
extern void initWiFi();
extern void initWebSocketClient();
extern void updateWebSocketLoop();

void setup() {
    Serial.begin(115200);
    initWiFi();              // Initialize WiFi
    initWebSocketClient();   // Initialize WebSocket Client
    AIcam_setup();           // Initialize AI camera
}

void loop() {
    updateWebSocketLoop();   // Must call this to keep the WebSocket connection alive
    AI_Detection();          // send eye data to Render Cloud
}
