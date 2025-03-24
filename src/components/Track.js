import { useState, useEffect } from "react";
import { Stepper, Step, StepLabel, Typography, Button, Card, CardContent } from "@mui/material";
import { CheckCircle, HourglassEmpty, Close, Verified } from "@mui/icons-material";
import Navigation from './Navigation';

const steps = ["Submitted", "Verified", "Interviewed", "Approved"];

const statusIcons = {
  completed: <CheckCircle color="success" />,
  pending: <HourglassEmpty color="warning" />,
  rejected: <Close color="error" />
};

const statusMessages = {
  pending: "Your documents are being reviewed. Please wait for verification.",
  verified: "Your application has been verified successfully.",
  rejected: "Unfortunately, your application was rejected. Please review the reason and resubmit.",
  submitted: "Your application has been submitted and is awaiting processing.",
  scheduled: "Interviews have been scheduled for you, Please check the dates for interviews.",
  interviewed: "Successfully succeeded in the Interviews, Pending payment..."
};

const userId = localStorage.getItem('userId');

export default function Track() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Loading...");
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("N/A");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/details")
      .then(response => response.json())
      .then(data => {
        const userDetails = data.find(detail => detail.user_id === parseInt(userId));
        if (userDetails) {
          setLastUpdated(userDetails.updated_at || "Unknown");
          switch (userDetails.status) {
            case "pending":
              setActiveStep(1);
              setCurrentStatus("Pending");
              break;
            case "approve":
              setActiveStep(2);
              setCurrentStatus("Verified");
              break;
            case "scheduled":
              setActiveStep(2);
              setCurrentStatus("Scheduled");
              break;
            case "approved":
              setActiveStep(3);
              setCurrentStatus("Interviewed");
              break;
            case "reject":
              setActiveStep(1);
              setCurrentStatus("Rejected");
              setRejectionMessage(userDetails.message || "Your application was rejected.");
              break;
            default:
              setActiveStep(0);
              setCurrentStatus("Submitted");
          }
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          Application Tracking Status
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card variant="outlined" style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h6">Current Status:</Typography>
            <Typography variant="body1" gutterBottom>
              {statusIcons[currentStatus === "Verified" || currentStatus === "Interviewed" ? "completed" : currentStatus === "Rejected" ? "rejected" : "pending"]} {currentStatus}
            </Typography>
            <Typography variant="body2">{statusMessages[currentStatus.toLowerCase()]}</Typography>
            {currentStatus === "Rejected" && (
              <Typography variant="body2" color="error">{rejectionMessage}</Typography>
            )}
            <Typography variant="caption" color="textSecondary">
              Last Updated: {lastUpdated}
            </Typography>
          </CardContent>
        </Card>

        {currentStatus === "Rejected" && (
          <Button variant="contained" color="secondary" fullWidth style={{ marginTop: 10 }}>
            Re-Submit
          </Button>
        )}
      </div>
    </>
  );
}
