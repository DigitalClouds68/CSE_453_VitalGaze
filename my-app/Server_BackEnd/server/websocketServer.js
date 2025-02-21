require("dotenv").config();
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// U can change the 👇👇port number👇👇 in .env file
const PORT = process.env.PORT || 8080; // allow to read the port from .env file
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

console.log(`🚀 WebSocket server is running at ${PORT}`);

wss.on("connection", (ws) => {
  console.log("Device Connected");

  /***********************************************************/
  /***********************************************************/
  //send the gaze data to the client every 1 second 
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const gazeData = JSON.stringify({
        x: Math.floor(Math.random() * 320),
        y: Math.floor(Math.random() * 240),
        timestamp: Date.now(),
      });
      ws.send(gazeData);
      console.log("📩 send gazes data：", gazeData);
    }
  }, 1000);
  /***********************************************************/
  /***********************************************************/

  ws.on("close", () => {
    clearInterval(interval);
    console.log("❌ Device Disconnected");
  });

  ws.on("error", (err) => {
    console.error("⚠️ WebSocket error:", err);
  });
});

// start the server
server.listen(PORT, () => console.log(`🚀 Server start at http://localhost:${PORT}`));
