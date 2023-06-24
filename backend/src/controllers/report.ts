import { Request, Response } from "express";
import { createReport, getLastReports } from "../models/report";
import { getRegistrationRequest } from "../models/provider";

export const report = async (req: Request, res: Response): Promise<void> => {
  if (req.method === "POST") {
    const reportData = req.body;
    const newReport = await createReport(reportData);

    if (newReport) {
      res.status(201).json(newReport);
    } else {
      res.status(500).json({ message: "Error creating report" });
    }
  } else if (req.method === "GET") {
    const reportType = req.path.split('/')[1]; // either "product-report" or "provider-report"
    const reports = await getLastReports(reportType);
    
    if (reports) {
      res.status(200).json(reports);
    } else {
      res.status(500).json({ message: "Error fetching reports" });
    }
  }
};


export const registrationReq = async (req: Request, res: Response): Promise<void> => {
  try {
    const providers = await getRegistrationRequest();
    if (providers) {
      res.json(providers);
    } else {
      res.status(404).json({ message: 'Providers not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
