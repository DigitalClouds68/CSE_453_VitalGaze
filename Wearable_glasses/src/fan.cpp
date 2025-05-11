#include <Arduino.h>
#include "project.h"

void fanSetup() {
  pinMode(FAN_PIN, OUTPUT);
  digitalWrite(FAN_PIN, HIGH);  // 上电就转
}

void fanOn() {
  digitalWrite(FAN_PIN, HIGH);
}

void fanOff() {
  digitalWrite(FAN_PIN, LOW);
}
