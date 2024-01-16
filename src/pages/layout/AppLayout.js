import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../../components/listItems';
import { Drawer } from '../../components/Drawer';
import { AppBar } from '../../components/AppBar';
import SlideBar from '../../components/Slidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function AppLayout({ children }){
    const defaultTheme = createTheme();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return(
        <>
            <ThemeProvider theme={defaultTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Header open={open} toggleDrawer={toggleDrawer} />
                    <SlideBar open={open} toggleDrawer={toggleDrawer} />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        {children}
                        <Footer sx={{ pt: 4 }} />
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}

export default AppLayout;