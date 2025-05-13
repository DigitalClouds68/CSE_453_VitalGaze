#include "project.h"

void temp_setup() {
  Serial.begin(115200);
}

void tempCloop() {
  float tempC = temperatureRead();  // Works on some ESP32s (not all)
  Serial.print("Temperature: ");
  Serial.println(tempC);
  delay(1000);
}
