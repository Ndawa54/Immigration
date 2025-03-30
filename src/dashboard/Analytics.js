import { Card, CardContent, CircularProgress, Grid2, Icon, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DashboardNav from './DashboardNav';
import { BarChart, PieChart } from '@mui/x-charts';
import { CheckCircleOutline, Checklist, HighlightOff, Task } from '@mui/icons-material';
import axios from 'axios';

export default function Analytics() {
    const [data, setData] = useState({ completed: 0, approved: 0, pending: 0, rejected: 0 });
    const [loading, setLoading] = useState(true);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/details');
                const details = response.data;

                setData({
                    completed: details.filter(item => item.status === 'completed').length,
                    approved: details.filter(item => item.status === 'approve').length,
                    pending: details.filter(item => item.status === 'pending').length,
                    rejected: details.filter(item => item.status === 'reject').length,
                });
            } catch (error) {
                console.log('Failed to load details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Stack alignItems="center" justifyContent="center" height="100vh"><CircularProgress size="3rem" /></Stack>;

    const statusCards = [
        { label: 'Approved', value: data.approved, color: '#4CAF50', icon: <CheckCircleOutline /> },
        { label: 'Rejected', value: data.rejected, color: '#F44336', icon: <HighlightOff /> },
        { label: 'Applied', value: data.pending, color: '#FF9800', icon: <Task /> },
        { label: 'Completed', value: data.completed, color: '#2196F3', icon: <Checklist /> },
    ];

    return (
        <>
            <DashboardNav />
            <Stack spacing={4} padding={3}>
                <Grid2 container spacing={2} justifyContent="center">
                    {statusCards.map((item, index) => (
                        <Grid2 item xs={6} sm={6} md={3} key={index}>
                            <Card sx={{ backgroundColor: item.color, color: 'white', textAlign: 'center', p: 2, width: 130}}>
                                <CardContent>
                                    <Icon fontSize='large'>{item.icon}</Icon>
                                    <Typography variant='h4' fontWeight='bold'>{item.value}</Typography>
                                    <Typography variant='h6'>{item.label}</Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>

                <Grid2 container spacing={3} justifyContent="center">
                    <Grid2 item xs={12} sm={12} md={6}>
                        <Card sx={{ p: 3, width: '100%' }}>
                            <Typography gutterBottom variant='h6' color='text.secondary'>Bar Chart</Typography>
                            <BarChart
                                xAxis={[{ id: 'categories', data: ['Applied', 'Rejected', 'Approved', 'Completed'], scaleType: 'band' }]}
                                series={[{ data: [data.pending, data.rejected, data.approved, data.completed] }]}
                                width={isSmallScreen ? 300 : 500}
                                height={350}
                            />
                        </Card>
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={6}>
                        <Card sx={{ p: 3, width: '100%' }}>
                            <Typography gutterBottom variant='h6' color='text.secondary'>Pie Chart</Typography>
                            <PieChart
                                series={[{
                                    data: [
                                        { id: 1, label: 'Applied', value: data.pending },
                                        { id: 2, label: 'Rejected', value: data.rejected },
                                        { id: 3, label: 'Approved', value: data.approved },
                                        { id: 4, label: 'Completed', value: data.completed },
                                    ],
                                    label: { position: 'outside' }
                                }]}
                                width={isSmallScreen ? 300 : 500}
                                height={350}
                            />
                        </Card>
                    </Grid2>
                </Grid2>
            </Stack>
        </>
    );
}
