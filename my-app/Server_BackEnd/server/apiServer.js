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

const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API server is running at port ${PORT}`));
