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

  editReport: async (req, res) => {
    try {
      const { id } = req.params; 
      const updatedData = req.body; 
  
      // Find the report by ID
      const existingReport = await Report.findById(id);
  
      if (!existingReport) {
        return res.status(404).json({ error: 'Report not found' });
      }
  
      // Update the report data with the new values
      existingReport.date = updatedData.date || existingReport.date;
      existingReport.serviceType = updatedData.serviceType || existingReport.serviceType;
      existingReport.section = updatedData.section || existingReport.section;
      existingReport.supervisor = updatedData.supervisor || existingReport.supervisor;
      existingReport.location = updatedData.location || existingReport.location;
  
      // Save the updated report
      const updatedReport = await existingReport.save();
  
      res.json({ message: 'Report updated successfully', updatedReport });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteReport: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedReport = await Report.findByIdAndDelete(id);
  
      if (!deletedReport) {
        return res.status(404).json({ error: 'Report not found' });
      }
  
      res.json({ message: 'Report deleted successfully', deletedReport });
    } catch (err) {
      console.error('Error deleting report:', err);
      res.status(500).json({ message: err.message });
    }
  },
}
  



module.exports = reportController;
