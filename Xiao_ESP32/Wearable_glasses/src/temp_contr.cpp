// #include <Arduino.h>
// #include "project.h"

// const int fanPin = 5; // Connect fan control pin to GPIO5

// void setup() {
//   // Set up PWM channel 0: 25kHz, 8-bit resolution
//   ledcSetup(0, 25000, 8);     
//   ledcAttachPin(fanPin, 0);   // Attach fanPin to channel 0
// }

// void loop() {
//   // Example: fan full speed
//   ledcWrite(0, 255);  // Max speed
//   delay(2000);

//   // Half speed
//   ledcWrite(0, 128);  // Medium speed
//   delay(2000);

//   // Turn fan off
//   ledcWrite(0, 0);    
//   delay(2000);
// }

