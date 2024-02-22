import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Footer from '../components/Footer';
import Title from "../components/Title";
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import { getUserToken } from '../utils/userToken';
import { useToast } from "@chakra-ui/react";
import bannerImage from "../assets/images/banner.png";
  

function Home(){
    const toast = useToast();
    const [lastOnlineTableRows, setLastOnlineTableRows] = useState([]);
    const [todayAlertSchedule, setTodayAlertSchedule] = useState([]);

    useEffect(() => {
        const userToken = getUserToken();
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/box/status/get/all", {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userToken: userToken,
			}),
        }).then(response => response.json()).then(response =>{
            if(response.status === "FAIL"){
				return console.log("> GetStatus : " + response.message);
			}
            if(response.status === "OK"){
                setLastOnlineTableRows(response.data.results);
            }
        });
    }, []);

    useEffect(() =>{
        const userToken = getUserToken();
        const currentTimestamp = new Date().getTime();
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/box/schedule/get", {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                timestamp: currentTimestamp,
				userToken: userToken,
			}),
        }).then(response => response.json()).then(response =>{
            if(response.status === "FAIL"){
				return console.log("> AlertSchedule : " + response.message);
			}
            if(response.status === "OK"){
                setTodayAlertSchedule(response.data.todayAlerts);
            }
        });
    }, []);
    
    return(
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={7} lg={8}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: "auto",
                        }}
                        >
                            <img src={bannerImage} className='w-fit h-fit' />
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={5} lg={4}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                        >
                            <Title>Last online</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>LastOnline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {lastOnlineTableRows.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{row.boxId}</TableCell>
                                        <TableCell>{new Date(parseInt(row.timestamp) + (7 * 60 * 60 * 1000)).toUTCString()}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>Today's Alert : {new Date().toLocaleDateString()}</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Box ID</TableCell>
                                        <TableCell>Alert ID</TableCell>
                                        <TableCell>Alert Name</TableCell>
                                        <TableCell>Channels</TableCell>
                                        <TableCell>Alert Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {todayAlertSchedule.map((todayAlert, i) =>(
                                        <TableRow key={i}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell>{todayAlert.boxId}</TableCell>
                                            <TableCell>{todayAlert.alertId}</TableCell>
                                            <TableCell>{todayAlert.alertName}</TableCell>
                                            <TableCell>{todayAlert.channels.join(", ")}</TableCell>
                                            <TableCell>{(new Date(parseInt(todayAlert.alertTime)).toTimeString()).split(" ")[0]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
          </Container>
        </>
    );
}

export default Home;