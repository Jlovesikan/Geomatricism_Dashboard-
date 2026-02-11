import React, { useEffect, useState } from "react";
import { Paper, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ProjectTaskChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [chartData, setChartData] = useState({
    labels: [],
    projectCounts: [],
    completedCounts: [],
  });

  const getLastSixMonths = () => {
    const months = [];
    const labels = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ 
        month: d.getMonth(), 
        year: d.getFullYear(), 
        pCount: 0, 
        cCount: 0 
      });
      labels.push(d.toLocaleString("default", { month: "short" }));
    }
    return { months, labels };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { months, labels } = getLastSixMonths();
        const querySnapshot = await getDocs(collection(db, "Projects"));

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (!data.StartDate) return;

          const date = new Date(data.StartDate); 
          if (isNaN(date.getTime())) return;

          const idx = months.findIndex(
            (m) => m.month === date.getMonth() && m.year === date.getFullYear()
          );

          if (idx !== -1) {
            months[idx].pCount += 1;
            if (data.Status === "complete") {
              months[idx].cCount += 1;
            }
          }
        });

        setChartData({
          labels,
          projectCounts: months.map((m) => m.pCount),
          completedCounts: months.map((m) => m.cCount),
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 1, sm: 3 }, // Less padding on mobile
        width: '100%', 
        borderRadius: 2,
        overflow: 'hidden' // Prevents chart bleeding
      }}
    >
      <Typography 
        variant={isMobile ? "subtitle1" : "h6"} 
        fontWeight="bold" 
        gutterBottom
      >
        Projects Progress (Last 6 Months)
      </Typography>

      <Box sx={{ width: '100%', height: { xs: 250, sm: 350 } }}>
        {chartData.labels.length > 0 && (
          <LineChart
            xAxis={[{ 
              data: chartData.labels, 
              scaleType: "band",
            }]}
            series={[
              {
                data: chartData.projectCounts,
                label: isMobile ? "Total" : "Total Projects",
                color: "#0288d1",
                area: true,
              },
              {
                data: chartData.completedCounts,
                label: isMobile ? "Done" : "Completed Projects",
                color: "#f1ee04",
                area: true,
              },
            ]}
            // Set height to "undefined" to allow the Box container to control it
            height={undefined} 
            margin={{ 
              left: 40, 
              right: 20, 
              top: 20, 
              bottom: 40 
            }}
            // Hides legend on very small screens to save space
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'center' },
                padding: 0,
                hidden: isMobile && window.innerWidth < 350 
              },
            }}
          />
        )}
      </Box>
    </Paper>
  );
}