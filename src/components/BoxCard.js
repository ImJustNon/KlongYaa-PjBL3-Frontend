import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import boxCardImage from "../assets/images/optimized_smarttuuyaa.jpg";
import plusSign from "../assets/images/plus_sign.png";
import { useNavigate } from "react-router-dom";
import { getUserToken } from '../utils/userToken';
import { useToast } from "@chakra-ui/react";

function BoxCard({ boxName, boxId, update }) {
    const navigate = useNavigate();
    const toast = useToast();

    function haddleEdit(){
        navigate(`/manage/b/${boxId}`)
    }
    function haddleRemove(){
        const userToken = getUserToken();
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/box/remove", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				boxId: boxId,
                userToken: userToken,
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
            if(response.status === "OK"){
                update(Math.random());
                return toast({
					title: response.message,
					status: "success",
					isClosable: true,
					position: "bottom-right",
					duration: 1500,
				});
            }
        });
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                        Box Name : {boxName}
                    </Typography>
                    <Typography>
                        ID : {boxId}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => haddleEdit()}>Edit</Button>
                    <Button size="small" color='error' onClick={() => haddleRemove()}>Remove</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}





export {
    BoxCard,
}