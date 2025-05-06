#include <Adafruit_SSD1306.h>
#include "project.h"

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void Display_setup() {
    display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
    display.clearDisplay();
    display.display();
}

void drawStatusBar() {
    display.setCursor(100, 0);
    display.print("WiFi");
    display.setCursor(0, 0);
    display.print("100%"); // Fake battery
    display.setCursor(60, 0);
    display.print("12:00"); // Fake time
}

void Display_showHome(Mode mode) {
    display.clearDisplay();
    drawStatusBar();
    display.setCursor(0, 16);
    display.print("Mode: ");
    if (mode == ONLINE) display.print("ONLINE");
    else if (mode == SLEEP) display.print("SLEEP");
    else display.print("OFFLINE");
    display.display();
}

void Display_blinkMode(Mode mode) {
    static unsigned long lastToggle = 0;
    static bool visible = true;

    if (millis() - lastToggle > 500) {
        visible = !visible;
        lastToggle = millis();
    }

    display.clearDisplay();
    drawStatusBar();
    display.setCursor(0, 16);
    if (visible) {
        display.print("Select: ");
        if (mode == ONLINE) display.print("ONLINE");
        else if (mode == SLEEP) display.print("SLEEP");
        else display.print("OFFLINE");
    }
    display.display();
}

void Display_confirmMode(Mode mode) {
    display.clearDisplay();
    drawStatusBar();
    display.setCursor(0, 16);
    display.print("Confirmed: ");
    if (mode == ONLINE) display.print("ONLINE");
    else if (mode == SLEEP) display.print("SLEEP");
    else display.print("OFFLINE");
    display.display();
}
