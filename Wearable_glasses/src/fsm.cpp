#include "project.h"

AppState appState = HOME_SCREEN;
Mode currentMode = ONLINE;
Mode selectedMode = ONLINE;

unsigned long buttonPressTime = 0;
bool buttonPressed = false;

void FSM_setup() {
    pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void FSM_loop() {
    bool isPressed = digitalRead(BUTTON_PIN) == LOW;

    if (isPressed && !buttonPressed) {
        buttonPressed = true;
        buttonPressTime = millis();
    }

    if (!isPressed && buttonPressed) {
        unsigned long pressDuration = millis() - buttonPressTime;
        buttonPressed = false;

        if (pressDuration < 500) { // Short press
            appState = SELECTING_MODE;
            selectedMode = (Mode)((selectedMode + 1) % 3); // cycle 0→1→2
        } else { // Long press
            currentMode = selectedMode;
            appState = MODE_CONFIRMED;
        }
    }
}
