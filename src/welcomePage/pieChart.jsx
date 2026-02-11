import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function TaskStatusChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Task"), (snapshot) => {
      const counts = { complete: 0, progress: 0, 'on hold': 0, cancel: 0 };

      snapshot.forEach((doc) => {
        const status = doc.data().Status?.toLowerCase();
        if (status in counts) counts[status] += 1;
      });

      const formattedData = [
        { id: 0, value: counts.complete, label: isMobile ? 'Done' : 'Complete', color: '#2e7d32' },
        { id: 1, value: counts.progress, label: isMobile ? 'Prog' : 'Progress', color: '#0288d1' },
        { id: 2, value: counts['on hold'], label: 'Hold', color: '#ed6c02' },
        { id: 3, value: counts.cancel, label: 'Cancel', color: '#d32f2f' },
      ];

      setChartData(formattedData);
      setTotalTasks(snapshot.size);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isMobile]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        width: '100%', 
        maxWidth: 600, 
        margin: 'auto', 
        borderRadius: 2 
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Task Analysis (Total: {totalTasks})
      </Typography>

      <Box sx={{ width: '100%', height: { xs: 300, sm: 340 } }}>
        <PieChart
          series={[
            {
              data: chartData,
              innerRadius: isMobile ? 50 : 70,
              outerRadius: isMobile ? 80 : 110,
              paddingAngle: 5,
              cornerRadius: 5,
              cx: isMobile ? '50%' : '50%', 
              cy: isMobile ? '40%' : '45%',
            },
          ]}
        
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'center' },
              padding: 0,
              labelStyle: {
                fontSize: isMobile ? 12 : 14,
              },
              itemGap: isMobile ? 10 : 20,
            },
          }}
        />
      </Box>
    </Paper>
  );
}