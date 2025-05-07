#include <Arduino.h>
#include "project.h"

void setup() {
    Sensor_setup();
}

void loop() {
    Serial.println(get_distance_mm());
}

