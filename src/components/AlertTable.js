import * as React from 'react';
import { useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import AlertModal from "./AlertModal";
import { useDisclosure } from "@chakra-ui/react";
import Button from "@mui/material/Button";
import { setTemp } from "../utils/tempData";
import { getUserToken } from '../utils/userToken';
import { useToast } from "@chakra-ui/react";

export default function AlertTable({ rows, boxId, update }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    function openModal(event, alertId){
        setTemp(alertId);
        console.log(alertId);
        onOpen(event);
    }

    function removeAlertSchedule(event, alertId){
        const userToken = getUserToken();
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/alert/remove", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
				userToken: userToken,
                boxId: boxId,
                alertId: alertId
			}),
        }).then(response => response.json()).then(response =>{
            if(response.status === "FAIL"){
                return toast({
					title: response.message,
					status: "error",
					isClosable: true,
					position: "bottom-right",
					duration: 1500,
				});
            }
            update(Math.random());
            toast({
                title: response.message,
                status: "success",
                isClosable: true,
                position: "bottom-right",
                duration: 1500,
            });
        });
    }

    return (
        <React.Fragment>
            <Title>Alert Schedule</Title>
            <Table size="small" sx={{ my: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Alert Time</TableCell>
                        <TableCell align="center">LED</TableCell>
                        <TableCell align="center">Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell align="center">{row.alert_id}</TableCell>
                        <TableCell align="center">{row.alert_name}</TableCell>
                        <TableCell align="center">{row.alert_time}</TableCell>
                        <TableCell align="center">{(JSON.parse(row.led_channel_id)).join(", ")}</TableCell>
                        <TableCell align="center">
                            <div className='flex flex-row justify-center gap-x-2 '>
                                <Button size='small' variant="contained" onClick={(event) => openModal(event, row.alert_id)}>Edit</Button>
                                <Button size='small' variant="contained" color="error" onClick={(event) => removeAlertSchedule(event, row.alert_id)}>Remove</Button>
                            </div>
                        </TableCell>
                        
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <AlertModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} update={update} mode={"edit"} boxId={boxId}  />
        </React.Fragment>
    );
}