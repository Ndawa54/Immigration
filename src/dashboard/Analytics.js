import { Card, CardContent, CircularProgress, Grid2, Icon, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DashboardNav from './DashboardNav';
import { BarChart, PieChart } from '@mui/x-charts';
import { CheckCircleOutline, Checklist, HighlightOff, Task } from '@mui/icons-material';
import axios from 'axios';

export default function Analytics() {
    const [data, setData] = useState({
        completed: 0,
        approved: 0,
        pending: 0,
        rejected: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/details')
                const details = response.data

                const statusCount = {
                    completed: 0,
                    approved: details.filter(item => item.status === 'approve').length,
                    pending: details.filter(item => item.status === 'pending').length,
                    rejected: details.filter(item => item.status === 'reject').length,

                }

                setData(statusCount)
            }catch(error){
                console.log('Failed to load details:', error)
            }finally{
                setLoading(false)
            }
            
         }
        fetchData()
    }, [])
    
  if (loading) return <Stack spacing={2} direction="column" alignItems="center" marginTop={34}> <CircularProgress size="3rem" /> </Stack>;
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
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>{data.approved}</Typography>
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
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>{data.rejected}</Typography>
                                <Typography variant="h5" component="div" fontSize='medium'>Rejected</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>

                    <Grid2 item xs={12} sm={6} md={4}>
                        <Card sx={{ m: 2, width: 150, height: 180, backgroundColor: '#A9A9A9', color: 'white' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Icon color='inherit' fontSize='large'>
                                    <Task fontSize='large' />
                                </Icon>
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>{data.pending}</Typography>
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
                                <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>{data.completed}</Typography>
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
                                        data: [data.pending, data.rejected, data.approved, data.completed]
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
                                            {id: 1 , label: 'Applied', value: data.pending},
                                            {id: 2 ,label: 'Rejected', value: data.rejected, },
                                            {id: 3 ,label: 'Approved', value: data.approved, },
                                            {id: 4 ,label: 'Completed', value: data.completed, },
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
