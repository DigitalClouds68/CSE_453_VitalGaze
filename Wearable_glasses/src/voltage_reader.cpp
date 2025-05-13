#include "project.h"

// the loop routine runs over and over again forever:
void Batteryleft() {
  int sensorValue = analogRead(A5);
  Serial.println(sensorValue);
  delay(1000);  // delay in between reads for stability
}

