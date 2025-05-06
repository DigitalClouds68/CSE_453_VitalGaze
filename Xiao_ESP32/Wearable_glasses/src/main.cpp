#include <Arduino.h>
#include "project.h"

void setup() {
  Serial.begin(115200);

  // Initialize hardware modules
  FSM_setup();
  Display_setup();
  LED_setup();
  Sensor_setup();
  AIcam_setup();

  Display_showHome(currentMode);
}

void loop() {
  FSM_loop();

  switch (appState) {
    case HOME_SCREEN:
      Display_showHome(currentMode);
      break;

    case SELECTING_MODE:
      Display_blinkMode(selectedMode);
      break;

    case MODE_CONFIRMED:
      Display_confirmMode(currentMode);
      delay(800);
      appState = HOME_SCREEN;
      break;
  }

  // Mode-specific behavior
  if (appState == HOME_SCREEN) {
    switch (currentMode) {
      case ONLINE:
        AIcam_detect(); // Run AI detection
        break;

      case READER:
        if (get_distance_mm() < 100) {  // Less than 10cm
          LED_off();         // Blink LEDs
        } else {
          LED_modeReader();         // Stay calm
        }
        break;

      case SLEEP:
        Display_showHome(SLEEP);
        esp_sleep_enable_timer_wakeup(10000000); // 10s light sleep
        esp_light_sleep_start();
        break;
    }
  }
}

