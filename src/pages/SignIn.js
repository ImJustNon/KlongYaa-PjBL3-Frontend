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


const defaultTheme = createTheme();

export default function SignIn() {
	const toast = useToast();
	const navigate = useNavigate();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmitSignIn = (event) => {
		fetch("https://klongyaa-pjbl3-backend.vercel.app/api/user/validate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userEmail: emailAddress,
				userPassword: password
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
				setUserToken(response.data.userToken);
				toast({
					title: response.message,
					status: "success",
					isClosable: true,
					position: "bottom-right",
					duration: 1500,
				});
				setTimeout(() => navigate("/"), 2500);
				return;
			}
		});
	};

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
					<i className="fa-solid fa-lock"></i>
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
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
						onChange={(event) => setEmailAddress(event.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Button onClick={() => handleSubmitSignIn()} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
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
  );
}