require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB(); // connect to MongoDB

app.use(cors());
app.use(express.json());

// Load the API routes
app.use("/api/auth", require("./routes/authRoutes"));

/* ***********************后期补充************************👇*/
//app.use("/api/sessions", require("./routes/sessionRoutes")); // 训练数据 API
//app.use("/api/tracking", require("./routes/trackingRoutes")); // 眼动追踪 API

const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API server is running at port ${PORT}`));
