const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const reportRoutes = require('./routes/reportRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5002;
app.use(cors());



// Mongoose connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log(err.message);
});


app.use(bodyParser.json());

// Use reportRoutes for handling report-related routes
app.use('/api', reportRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
