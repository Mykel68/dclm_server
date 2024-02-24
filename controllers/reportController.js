const Report = require('../models/reportModel');

const reportController = {
  fetchReports: async (req, res) => {
    try {
      const reports = await Report.find();
      res.json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  submitReport: async (req, res) => {
    const reportData = req.body;

    try {
      const newReport = new Report(reportData);
      await newReport.save();
      res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = reportController;
