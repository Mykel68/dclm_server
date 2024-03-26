const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const reportRoutes = require("./routes/super_admin/reportRoutes");
require("dotenv").config();
const authRoutes = require("./routes/super_admin/authRoutes");
const cors = require("cors");
const AdminReportRoutes = require("./routes/admin/reportRoutes");

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

// Super_admin Routes
app.use("/api", reportRoutes);
app.use("/auth", authRoutes);

//Admin routes
app.use("/admin", AdminReportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
