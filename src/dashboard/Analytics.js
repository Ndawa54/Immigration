import { Card, CardContent, Grid2, Stack, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import DashboardNav from './DashboardNav';
import { BarChart } from '@mui/x-charts';

const data = {
    labels: ['Approved', 'Rejected', 'Pending'],
    datasets: [
        {
            label: 'Counts',
            data: [9, 5, 2], // Replace with actual pending count
            backgroundColor: [
                'rgba(139, 195, 74, 0.6)',
                'rgba(211, 83, 83, 0.6)',
                'rgba(0, 131, 143, 0.6)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};


export default function Analytics() {
    return (
        <>
            <DashboardNav />
            <Stack spacing={2}>
                <Grid2 container spacing={1} sx={{ml:5,}}>
                    <Grid2 size={{ xs: 7, sm: 3 }}>
                        <Card sx={{ m: 3, width: 160, height: 120, backgroundColor: '#8bc34a', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">Approved</Typography>
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>9</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>

                    <Grid2 size={{ xs: 4, sm: 3 }} >
                        <Card sx={{ m: 3,  width: 160, height: 120, backgroundColor: '#d15353', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">Rejected</Typography>
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>5</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 7, sm: 3 }}>
                        <Card sx={{ m: 3, width: 160, height: 120, backgroundColor: '#00838f', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">Applied</Typography>
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>16</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 4, sm: 3 }}>
                        <Card sx={{ m: 3, width: 160, height: 120, backgroundColor: '#00838f', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">Completed</Typography>
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>10</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
                <BarChart
                xAxis={[
                    {
                        id:'categories',
                        data: ['applied','rejected', 'approved','completed'],
                        scaleType: 'band'
                    }
                ]}

                series={[
                    {
                        data: [5,10,9,16]
                    }
                ]}
                width={500}
                height={400}
                
                />
                
                {/* <Bar  key={JSON.stringify(data)} data={data} options={options} /> */}
            </Stack>
            
        </>
    );
}
