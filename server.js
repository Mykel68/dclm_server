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

app.use(cors());
app.use(bodyParser.json());
app.use("/api", reportRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
