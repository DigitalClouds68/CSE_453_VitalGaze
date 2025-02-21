# CSE_453_VitalGaze

## Overview

VitalGaze is an eye-training project that aims to help users improve their eye coordination and tracking abilities through interactive VR games and glasses-embedded LEDs. This project was developed as part of the **CSE 453** course (currently in **Phase 1: Software Development**), incorporating concepts from **game development, backend services, and user feedback**.

## 📁 Files & Folder Structure

### 🕹️ **VR Games (Frontend)**
- **The_VitalGaze_VR_GAMES/** → Contains all the **Unity-based VR games** developed for the VitalGaze project.
- **(To do... Add frontend details)**

### 🖥 **Backend (Node.js Server)**
- **Server_BackEnd/**
  - `config/db.js` → Database configuration (MongoDB)
  - `models/` → Mongoose schemas for **User, Sessions, Eye Tracking Logs, User Settings**
  - `routes/authRoutes.js` → Authentication API (Signup, Login)
  - `apiServer.js` → Main Express API server (RESTful)
  - `websocketServer.js` → WebSocket server for real-time eye-tracking data communication
  - `package.json` → Backend dependencies

---

## 🛠 **Prerequisites**
To run this project, make sure you have the following installed:

1. **Backend Requirements (for `Server_BackEnd/`)**
   - [Node.js (v16+)](https://nodejs.org/) - Required to run the backend
   - [MongoDB](https://www.mongodb.com/) - Used as the database
   - **Postman (optional)** - To test API requests

2. **Frontend Requirements (for VR Games)**
   - **Unity Version:** This project is built using **Unity 2021.3.45f1**.
   - **Expo (for React Native App, if applicable)**

---

## 🚀 **Backend Installation & Setup (Server_BackEnd)**
To set up and run the **Node.js backend server**:

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/DigitalClouds68/CSE_453_VitalGaze.git
cd CSE_453_VitalGaze/Server_BackEnd

### todo....

