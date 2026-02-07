import { Paper, Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 400, label: 'Group A', color: '#0088FE' },
  { id: 1, value: 300, label: 'Group B', color: '#00C49F' },
  { id: 2, value: 300, label: 'Group C', color: '#FFBB28' },
  { id: 3, value: 200, label: 'Group D', color: '#FF8042' },
];

export default function DonutChart() {
  return (
    <Paper elevation={3} sx={{ p: 2, display: 'inline-block',height:'400px',width:'100%'}}>
      <Typography variant="h6" gutterBottom>Chart Title</Typography>
      <PieChart
        series={[
          {
            data,
            innerRadius: 50,
            outerRadius: 80, // Reduced slightly to fit label room
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        width={300}
        height={200}
        // This is how you handle the Legend in MUI X Charts
        slotProps={{
          legend: {
            direction: 'column',
            position: { vertical: 'bottom', horizontal: 'right' },
            padding: 0,
            labelStyle: {
        fontSize: 20, // Smaller font helps fit more items in one row
      },
          },
        }}
      />
    </Paper>
  );
}