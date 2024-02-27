const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const reportRoutes = require("./routes/reportRoutes");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your client's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // enable set cookie
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const app = express();
const port = process.env.PORT || 5002;
app.use(cors());
app.use(bodyParser.json());

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

// Use reportRoutes for handling report-related routes
app.use("/api", reportRoutes);

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
