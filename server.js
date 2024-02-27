const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const reportRoutes = require("./routes/reportRoutes");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5002;

// Mongoose connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Enable CORS for all routes
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Use reportRoutes for handling report-related routes
app.use("/api", reportRoutes);

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
