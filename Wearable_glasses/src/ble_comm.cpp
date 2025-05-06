#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLE2902.h>
#include <Arduino.h>

#define SERVICE_UUID        "12345678-1234-1234-1234-1234567890ab"
#define CHARACTERISTIC_UUID "87654321-4321-4321-4321-ba0987654321"

BLECharacteristic* pCharacteristic;

void initBLE() {
  BLEDevice::init("ESP32-VitalGaze");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);

  pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_NOTIFY
  );

  pCharacteristic->addDescriptor(new BLE2902());
  pService->start();
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->start();

  Serial.println("✅ BLE initialized and advertising");
}

void notifyEyeData(uint16_t x, uint16_t y) {
  if (!pCharacteristic) return;

  String json = "{\"x\":" + String(x) + ",\"y\":" + String(y) + "}";
  pCharacteristic->setValue(json.c_str());
  pCharacteristic->notify();
  Serial.println("[BLE] 📡 Notified: " + json);
}
