'use client'
import React, { useState, useEffect } from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  LinearProgress,
  IconButton,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";

const CandidateSelection = () => {
  const [cvData, setCVData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5328/recruiter/top_resumes",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCVData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching CV data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: "100%", position: "relative" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <BaseCard title="Top Matched and Selected Resumes">
        <TableContainer
          sx={{
            width: {
              xs: "300px",
              sm: "100%",
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                  Candidate Details
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Skills
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Degree Level
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Major
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Job_ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cvData.map((cv, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography fontSize="15px" fontWeight={500}>
                      {cv.ID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box>
                      <Typography variant="h6" fontWeight={600}>
                          {cv.Name}
                        </Typography>
                        <Typography color="textSecondary" fontSize="13px">
                          {cv.Email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {cv.Skills}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {cv.Degree_level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {cv.Majors}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {cv.JOb_id}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                  <IconButton>
                    <ForwardToInboxIcon fontSize="large" color="success" />
                  </IconButton>
                  <IconButton>
                    <CancelIcon fontSize="large" sx={{ color: "#f44336" }} />
                  </IconButton>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BaseCard>
    </>
  );
};

export default CandidateSelection;
