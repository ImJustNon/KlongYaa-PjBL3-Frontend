import './App.css';
import Routers from "./routes/Routers";
import { ChakraProvider } from '@chakra-ui/react'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const defaultTheme = createTheme();

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
