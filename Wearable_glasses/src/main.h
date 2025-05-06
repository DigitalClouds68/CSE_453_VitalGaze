#ifndef MAIN_H
#define MAIN_H

#include <Arduino.h>

// AI
void AIcam_setup();  
void AI_Detection();   

// WebSocket
void initWebSocketClient();
void updateWebSocketLoop();
void sendEyeData(uint16_t x, uint16_t y, uint16_t w, uint16_t h);

// Wi-Fi
void initWiFi();

// BLE
void initBLE();
void notifyEyeData(uint16_t x, uint16_t y);

// AI Control
bool isAIEnabled();

#endif // MAIN_H
