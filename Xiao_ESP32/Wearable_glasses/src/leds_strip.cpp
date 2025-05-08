#include <FastLED.h>
#include "project.h"

#define RAINBOW_SPEED 1  // smaller = faster

// Define the array of leds
CRGB ledsLeft[NUM_LEDS];
CRGB ledsRight[NUM_LEDS];
uint8_t gHue = 0;  // Used for rainbow animation
unsigned long lastBlink = 0;
bool blinkState = false;

void LED_setup() { 
  FastLED.addLeds<WS2812B, LEFT_LED_PIN, RGB>(ledsLeft, NUM_LEDS);
  FastLED.addLeds<WS2812B, RIGHT_LED_PIN, RGB>(ledsRight, NUM_LEDS);
  FastLED.clear();
  FastLED.show();
}

void LED_off() {
  fill_solid(ledsLeft, NUM_LEDS, CRGB::Black);
  fill_solid(ledsRight, NUM_LEDS, CRGB::Black);
  FastLED.show();
}

// Rainbow effect for ONLINE mode
void LED_modeOnline() {
  fill_rainbow(ledsLeft, NUM_LEDS, gHue);
  fill_rainbow(ledsRight, NUM_LEDS, gHue);
  FastLED.show();
  gHue += RAINBOW_SPEED;
}

// Blinking yellow for READER mode
void LED_modeReader() {
  if (millis() - lastBlink >= 300) {
    blinkState = !blinkState;
    CRGB color = blinkState ? CRGB::Yellow : CRGB::Black;
    fill_solid(ledsLeft, NUM_LEDS, color);
    fill_solid(ledsRight, NUM_LEDS, color);
    FastLED.show();
    lastBlink = millis();
  }
}


void LED_clockwise() {
  for (int i = 0; i < NUM_LEDS; i++) {
    // Clear previous LEDs
    fill_solid(ledsLeft, NUM_LEDS, CRGB::Black);
    fill_solid(ledsRight, NUM_LEDS, CRGB::Black);

    // Light up the current LED
    ledsLeft[i] = CRGB::Yellow;
    ledsRight[i] = CRGB::Yellow;

    // Show on both rings
    FastLED.show();
    delay(100);  // Adjust speed here
  }
}

void LED_counterclockwise(){
  for (int i = NUM_LEDS - 1; i >= 0; i--) {
    // Clear previous LEDs
    fill_solid(ledsLeft, NUM_LEDS, CRGB::Black);
    fill_solid(ledsRight, NUM_LEDS, CRGB::Black);

    // Light up the current LED
    ledsLeft[i] = CRGB::Yellow;
    ledsRight[i] = CRGB::Yellow;

    // Show on both rings
    FastLED.show();
    delay(100);  // Adjust speed here
  }
}