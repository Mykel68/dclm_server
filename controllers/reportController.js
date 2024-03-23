const Report = require("../models/reportModel");

const reportController = {
  fetchReports: async (req, res) => {
    try {
      const reports = await Report.find();
      res.json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  submitReport: async (req, res) => {
    const reportData = req.body;

    try {
      const newReport = new Report(reportData);
      await newReport.save();
      res.status(201).json({ message: "Report submitted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  editReport: async (req, res) => {
    try {
      const { id } = req.params;
      // Find the report by ID
      const existingReport = await Report.findById({ _id: id }).then(
        (existingReport) => {
          if (!existingReport) {
            return res.status(404).json({ error: "Report not found" });
          }
          res.json(existingReport);
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateReport: async (req, res) => {
    const { id } = req.params;
    try {
      const {
        serviceType,
        section,
        supervisor,
        location,
        // Add other properties here
      } = req.body;

      const updatedReport = await Report.findByIdAndUpdate(
        { _id: id },
        {
          serviceType,
          section,
          supervisor,
          location,
          // Add other properties here
        },
        { new: true } // To return the updated document
      );

      if (!updatedReport) {
        return res.status(404).json({ error: "Report not found" });
      }

      res.status(200).json(updatedReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteReport: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedReport = await Report.findByIdAndDelete(id);

      if (!deletedReport) {
        return res.status(404).json({ error: "Report not found" });
      }

      res.json({ message: "Report deleted successfully", deletedReport });
    } catch (err) {
      console.error("Error deleting report:", err);
      res.status(500).json({ message: err.message });
    }
  },

  getReportCount: async (req, res, next) => {
    try {
      const reportCount = await Report.countDocuments();
      res.json({ reportCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = reportController;
