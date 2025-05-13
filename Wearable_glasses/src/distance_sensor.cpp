#include <Wire.h>
#include <VL53L1X.h>
#include "project.h"

VL53L1X sensor;

void Sensor_setup()
{
  Serial.begin(115200);
  Wire.begin(SDA_PIN, SCL_PIN);
  Wire.setClock(400000); // use 400 kHz I2C

  sensor.setTimeout(500);
  if (!sensor.init())
  {
    Serial.println("Failed to detect and initialize sensor!");
    while (1);
  }
  sensor.setDistanceMode(VL53L1X::Long);
  sensor.setMeasurementTimingBudget(100000);
  sensor.startContinuous(50);
}

int get_distance_mm()
{
  int distance = sensor.read();
  if (sensor.timeoutOccurred()) { Serial.print(" TIMEOUT"); }
  return distance;
}