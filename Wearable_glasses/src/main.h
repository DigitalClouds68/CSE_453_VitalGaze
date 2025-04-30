#ifndef MAIN_H
#define MAIN_H

#include <Arduino.h>

// Function prototypes
void AIcam_setup();  // Function to initialize the AI camera
void AI_Detection();   // Function to perform AI detection

// WIFI
void initWiFi();
void sendEyeData(uint16_t x, uint16_t y, uint16_t w, uint16_t h);

void initWebSocketClient();
void updateWebSocketLoop();

#endif // MAIN_H