import { Card, CardContent, Grid2, Icon, Stack, Typography } from '@mui/material';
import React from 'react';
import DashboardNav from './DashboardNav';
import { BarChart, PieChart } from '@mui/x-charts';
import { CheckCircleOutline, Checklist, HighlightOff, Task } from '@mui/icons-material';

export default function Analytics() {
    return (
        <>
            <DashboardNav />
            <Stack spacing={2}>
                <Grid2 container spacing={2} justifyContent="center" alignItems="center">
                    <Grid2 item xs={12} sm={6} md={4}>
                        <Card sx={{ m: 2, width: 150, height: 180, backgroundColor: '#8BC34A', color: 'white' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Icon color='inherit' fontSize='large' >
                                    <CheckCircleOutline fontSize='large' />
                                </Icon>
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>9</Typography>
                                <Typography variant="h5" component="div" sx={{ fontSize: 'medium' }}>Approved</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>

                    <Grid2 item xs={12} sm={6} md={4}>
                        <Card sx={{ m: 2, width: 150, height: 180, backgroundColor: '#d15353', color: 'white' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Icon color='inherit' fontSize='large'>
                                    <HighlightOff fontSize='large' />
                                </Icon>
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>5</Typography>
                                <Typography variant="h5" component="div" fontSize='medium'>Rejected</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>

                    <Grid2 item xs={12} sm={6} md={4}>
                        <Card sx={{ m: 2, width: 150, height: 180, backgroundColor: '#00838f', color: 'white' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Icon color='inherit' fontSize='large'>
                                    <Task fontSize='large' />
                                </Icon>
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>16</Typography>
                                <Typography variant="h5" component="div" fontSize='medium'>Applied</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>

                    <Grid2 item xs={12} sm={6} md={4}>
                        <Card sx={{ m: 2, width: 150,  height: 180, backgroundColor: '#00838f', color: 'white' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Icon color='inherit' fontSize='large'>
                                    <Checklist fontSize='large' />
                                </Icon>
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>10</Typography>
                                <Typography variant="h5" component="div" fontSize='medium'>Completed</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={2} justifyContent="center" marginBottom={10}>
                    <Grid2 item xs={12} md={8}>
                        <Card sx={{ p: 3, width: '100%' }}>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                BarChart
                            </Typography>
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'categories',
                                        data: ['Applied', 'Rejected', 'Approved', 'Completed'],
                                        scaleType: 'band'
                                    }
                                ]}
                                series={[
                                    {
                                        data: [5, 10, 9, 16]
                                    }
                                ]}
                                width={500}
                                height={350}
                            />
                        </Card>
                    </Grid2>

                    <Grid2 item xs={12} md={8}>
                        <Card sx={{ p: 3, width: '100%' }}>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                PieChart
                            </Typography>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            {id: 1 , label: 'Applied', value: 16},
                                            {id: 2 ,label: 'Rejected', value: 5, },
                                            {id: 3 ,label: 'Approved', value: 9, },
                                            {id: 4 ,label: 'Completed', value: 10, },
                                        ],
                                        label: {
                                            position: 'outside'
                                        }
                                    }
                                ]}
                                width={500}
                                height={350}
                            />
                        </Card>
                    </Grid2>
                </Grid2>
            </Stack>
        </>
    );
}
