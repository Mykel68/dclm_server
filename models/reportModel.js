const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  date: String,
  serviceType: String,
  subService: String,
  subServiceDay: String,
  section: String,
  supervisor: String,
  personnelCount: Number,
  volunteersCount: Number,
  challenges: String,
  solution: String,
  equipmentDetails: String,
  remarks: String,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
