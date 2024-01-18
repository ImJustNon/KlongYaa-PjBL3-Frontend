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

function BoxCard() {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="div"
                    sx={{
                        pt: '56.25%',
                    }}
                    image={boxCardImage}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Box Name : 
                    </Typography>
                    <Typography>
                        ID : 
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Edit</Button>
                    <Button size="small" color='error'>Remove</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}


function CreateNewBoxCard({ onClick }){
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: 'fit', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    className=' cursor-pointer'
                    component="div"
                    sx={{
                        pt: '56.25%',
                    }}
                    image={plusSign}
                    onClick={onClick}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" textAlign={"center"}>
                        Register a New Box
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}


export {
    BoxCard,
    CreateNewBoxCard,
}