import { Drawer } from "./Drawer";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from "react-router-dom";
import { getUserToken, removeUserToken } from "../utils/userToken";
import { getDeviceId } from "../utils/deviceId";


function SlideBar({ open, toggleDrawer }){
    const navigate = useNavigate();

    function handleLogout(){
        const userToken = getUserToken();
        const deviceId = getDeviceId();
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/device/create", {
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
				return console.log("Remove from history : " + response.message);
			}
            removeUserToken();
            return console.log("Remove from history : " + response.message);
        });

    }

    return(
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <ListItemButton onClick={() => navigate("/home")}>
                    <ListItemIcon>
                        <i className="fa-solid fa-house"></i>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/manage")}>
                    <ListItemIcon>
                        <i className="fa-solid fa-list-check"></i>
                    </ListItemIcon>
                    <ListItemText primary="Manage" />
                </ListItemButton>
                <Divider sx={{ my: 1 }} />
                <ListSubheader component="div" inset>
                    System
                </ListSubheader>
                <ListItemButton onClick={() => handleLogout()}>
                    <ListItemIcon>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </Drawer>
    );
}


export default SlideBar;