const express = require("express");
const Report = require("../../models/reportModel");

const app = express();

const getReport = async (req, res) => {
  try {
    const { section } = req.params;

    const reports = await Report.find({ section });
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReportCount = async (req, res, next) => {
  try {
    // console.log("Request received:", req.params);
    const { section } = req.params;
    // console.log("Section:", section);

    const reportCount = await Report.countDocuments({ section });
    // console.log("Report count:", reportCount);

    res.json({ reportCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editReport = async (req, res) => {
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
};

const submitReport = async (req, res) => {
  try {
    // Assuming userType or section of the admin is available in the request
    const { userType, section } = req;

    // If you're using userType to determine the section
    // const adminSection =
    //   userType === "admin" ? "AdminSection" : "SuperAdminSection";

    // If you have the section directly available in the request
    // const adminSection = section;

    // Assign the admin section to the reportData
    const reportData = { ...req.body, section: adminSection };

    const newReport = new Report(reportData);
    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getReport, editReport, getReportCount, submitReport };
