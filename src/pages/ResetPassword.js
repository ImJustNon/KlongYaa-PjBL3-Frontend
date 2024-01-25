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
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setUserToken } from '../utils/userToken';

function ResetPassword(){
    const defaultTheme = createTheme();
    const navigate = useNavigate();
    const toast = useToast();

    const [referPass, setReferPass] = useState("");
    const [isEnableSendCodeBtn, setIsEnableSendCodeBtn] = useState(true);
    const [isEnableSubmitBtn, setIsEnableSubmitBtn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");


    function handleSendCode(){
        if(userEmail.length === 0){
            return toast({
                title: "Please enter email address that linked with your account",
                status: "warning",
                isClosable: true,
                position: "bottom-right",
                duration: 1500,
            });
        }

        toast({
            title: "Sending to your Email",
            status: "loading",
            isClosable: true,
            position: "bottom-right",
            duration: 2000,
        });
        setIsEnableSendCodeBtn(false);
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/user/resetpass/sendmail", {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userEmail: userEmail,
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
                setReferPass(response.data.referPass);
                setIsEnableSubmitBtn(true);
                toast({
                    title: "You can resend again in 1 minute",
                    status: "loading",
                    isClosable: false,
                    position: "bottom-right",
                    duration: 60 * 1000,
                });
                toast({
                    title: "Sended. Open your inbox to get the code",
                    status: "success",
                    isClosable: true,
                    position: "bottom-right",
                    duration: 2000,
                });

                return setTimeout((timeout) =>{
                    setIsEnableSendCodeBtn(true);
                    toast.closeAll();
                }, 60 * 1000);
            }
        });
    }

    function handleVerifyCodeAndSetNewPass(){
        if(referPass.length === 0){
            return toast({
                title: "Please send the code first",
                status: "warning",
                isClosable: true,
                position: "bottom-right",
            });
        }
        if(verifyCode.length === 0 || newPassword.length === 0 || newPasswordRepeat.length === 0){
            return toast({
                title: "Please enter verify code and new password",
                status: "warning",
                isClosable: true,
                position: "bottom-right",
            });
        }

        if(!newPassword.includes(newPasswordRepeat)){
            return toast({
                title: "Password not same",
                status: "warning",
                isClosable: true,
                position: "bottom-right",
            });
        }
        
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/user/resetpass/verify", {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				newUserPassword: newPassword,
                code: verifyCode,
                userEmail: userEmail,
                referPass: referPass,
			}),
        }).then(response => response.json()).then(response =>{
            if(response.status === "FAIL"){
                return toast({
                    title: response.message,
                    status: "error",
                    isClosable: true,
                    position: "bottom-right",
                });
            }
            if(response.status === "OK"){
                toast({
                    title: response.message,
                    status: "success",
                    isClosable: true,
                    position: "bottom-right",
                });
                return setTimeout(() =>{
                    navigate("/signin");
                    toast.closeAll();
                }, 1000);
            }
        });
    }

    return(
        <>
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
                            <i className="fa-solid fa-key"></i>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <Box noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(event) => setUserEmail(event.target.value)}
                            />
                            <Button onClick={() => handleSendCode()} disabled={!isEnableSendCodeBtn} fullWidth variant="contained" sx={{ my: 1 }} >
                                Send Code
                            </Button>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Verify Code"
                                label="Verify Code"
                                type="text"
                                id="Verify Code"
                                onChange={(event) => setVerifyCode(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="New Password"
                                label="New Password"
                                type="text"
                                id="New Password"
                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="New Password (Repeat)"
                                label="New Password (Repeat)"
                                type="password"
                                id="New Password (Repeat)"
                                onChange={(event) => setNewPasswordRepeat(event.target.value)}
                            />
                            
                            <Button onClick={() => handleVerifyCodeAndSetNewPass()} disabled={!isEnableSubmitBtn} fullWidth variant="contained" sx={{ my: 1}} >
                                Submit
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/signin" variant="body2">
                                        Can remember now?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup" variant="body2">
                                        {"Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}


export default ResetPassword;