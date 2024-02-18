import './App.css';
import Routers from "./routes/Routers";
import { ChakraProvider } from '@chakra-ui/react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { config } from './config/config';
import { getUserToken, removeUserToken } from './utils/userToken';
import { getDeviceId, createDeviceId } from "./utils/deviceId";

function App() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // check access token before go another page
  const preventCheckPages = config.pages.preventCheckTokenPaths;
  useEffect(() =>{
    const userToken = localStorage.getItem("userToken");
    if(preventCheckPages.includes(pathname)) return;
    if(!userToken){
      return navigate("/signin");
    }
  }, []);

  // create device id
  useEffect(() =>{ 
    (async() =>{
      const deviceId = getDeviceId();
      if(!deviceId){
        // create new
        await fetch("https://klongyaa-pjbl3-backend.vercel.app/api/device/create", {
          method: "POST",
        }).then(response => response.json()).then(async response =>{
          if(response.status === "FAIL"){
            return console.log("> CreateNewDeviceId : " + response.message);
          }
          createDeviceId(response.data.deviceId);
          await checkLoginExpire();
        });
      }
      else {
        await checkLoginExpire();
      }
    })(); 
  }, []);

  async function checkLoginExpire(){
    const userToken = getUserToken();
    const deviceId = getDeviceId();
    if(!userToken || !deviceId) return;
    await fetch("https://klongyaa-pjbl3-backend.vercel.app/api/user/login/history/checkexpire", {
      method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userToken: userToken,
				deviceId: deviceId
			}),
    }).then(response => response.json()).then(response =>{
      if(response.status === "FAIL"){
        return console.log("> CheckLoginHistory : " + response.message);
      }
      return console.log("> CheckLoginHistory : " + response.message);
    });
  }

  return (
    <>
      {/* <ThemeProvider theme={defaultTheme}> */}
        <ChakraProvider>
          <Routers />
        </ChakraProvider>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
