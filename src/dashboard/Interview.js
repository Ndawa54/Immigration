import { Label } from "@mui/icons-material";
import { 
  Box, Button, Card, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, 
  Input, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DashboardNav from "./DashboardNav";
import axios from "axios";

export default function Interview() {
  const [applicants, setApplicants] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data from two APIs
    const fetchApplicants = async () => {
      try {
        const usersResponse = await axios.get("http://127.0.0.1:8000/api/users");
        const detailsResponse = await axios.get("http://127.0.0.1:8000/api/details");

        // Merge the data using user_id from details and id from users
        const mergedData = detailsResponse.data.map((detail) => {
          const user = usersResponse.data.find((u) => u.id === detail.user_id);
          return {
            id: detail.user_id,
            name: user ? user.name : "Unknown",
            status: detail.status,
            interviewDate: detail.interview_date ,
            interviewStatus: detail.interview_status
          };
        });

        setApplicants(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchApplicants();
  }, []);

  const handleSchedule = (applicant) => {
    setSelectedApplicant(applicant);
    setOpen(true);
  };

  const confirmSchedule = () => {
    console.log(`Scheduled ${selectedApplicant.name} on ${date}`);
    setOpen(false);
  };

   if (loading) return <Stack spacing={2} direction="column" alignItems="center" marginTop={34}> <CircularProgress size="3rem" /> </Stack>;

  return (
    <>
      <DashboardNav />
      <div className="p-6">
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Interview Scheduling</h2>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
                <Table
                  sx={{
                    '& .MuiTableCell-root': { padding: '10px 16px' },
                    '& .MuiTableRow-root:hover': { backgroundColor: '#f5f5f5' },
                    '& .MuiTableRow-root:nth-of-type(odd)': { backgroundColor: '#fafafa' }
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      {/* <TableCell>Status</TableCell> */}
                      <TableCell>Interview Date</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Approve</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applicants
                    .filter(applicant => applicant.status ==='approve' || applicant.status === 'scheduled')
                    .map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell>{applicant.name}</TableCell>
                        {/* <TableCell>{applicant.status}</TableCell> */}
                        <TableCell>{applicant.interviewDate}</TableCell>
                        <TableCell>
                          {applicant.status === "approve" && (
                            <Button onClick={() => handleSchedule(applicant)}>Schedule</Button>
                          )}
                        </TableCell>
                        <TableCell>
                            {applicant.status === 'scheduled' && (
                                <Button>Approve</Button>
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogContent>
            <Label>Date & Time</Label>
            <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmSchedule}>Confirm</Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
