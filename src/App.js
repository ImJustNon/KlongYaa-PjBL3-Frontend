import './App.css';
import Routers from "./routes/Routers";
import { ChakraProvider } from '@chakra-ui/react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // check access token before go another page
  const preventCheckPages = ["/signin", "/signup"];
  useEffect(() =>{
    const userToken = localStorage.getItem("userToken");
    console.log(pathname);
    if(preventCheckPages.includes(pathname)) return;
    if(!userToken){
      return navigate("/signin");
    }
  }, []);

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
