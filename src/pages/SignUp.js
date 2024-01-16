import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function SignUp() {
    const toast = useToast();
    const navigate = useNavigate();

    const [ userName, setUserName ] = useState("");
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleSubmitSignUp(){
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/user/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                userEmail: emailAddress,
                userPassword: password,
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
                toast({
					title: response.message,
					status: "success",
					isClosable: true,
					position: "bottom-right",
					duration: 1500,
				});
                setTimeout(() => navigate("/signin"), 2500);
                return;
            }
        });
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "black" }}>
                        <i className="fa-solid fa-registered"></i>
				    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register an Account
                    </Typography>
                    <Box noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    onChange={(event) => setUserName(event.target.value)}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Usename"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(event) => setEmailAddress(event.target.value)}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={(event) => handleSubmitSignUp(event)} >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signin" variant="body2" className='hover:underline'>
                                    Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


export default SignUp;