#include "project.h"
// #include "esp_system.h"
// #include "esp_adc_cal.h"
// #include "driver/temperature_sensor.h"

// void temp_setup() {
//   Serial.begin(115200);
//   delay(1000);

//   // Setup temperature sensor
//   temperature_sensor_handle_t temp_sensor = NULL;
//   temperature_sensor_config_t temp_config = {
//     .range_min = 10,
//     .range_max = 50
//   };

//   // Install and enable the temperature sensor
//   ESP_ERROR_CHECK(temperature_sensor_install(&temp_config, &temp_sensor));
//   ESP_ERROR_CHECK(temperature_sensor_enable(temp_sensor));

//   float temp_value = 0;
//   ESP_ERROR_CHECK(temperature_sensor_get_celsius(temp_sensor, &temp_value));
//   Serial.print("CPU Temperature: ");
//   Serial.print(temp_value);
//   Serial.println(" °C");

//   // You can disable if done
//   ESP_ERROR_CHECK(temperature_sensor_disable(temp_sensor));
//   ESP_ERROR_CHECK(temperature_sensor_uninstall(temp_sensor));
// }

// void Turnfan_on() {
//   // Nothing in loop, or call temp read repeatedly
// }

// void Turnfan_off() {
//   // Nothing in loop, or call temp read repeatedly
// }

void temp_setup() {
  Serial.begin(115200);
}

void tempCloop() {
  float tempC = temperatureRead();  // Works on some ESP32s (not all)
  Serial.print("Temperature: ");
  Serial.println(tempC);
  delay(1000);
}
