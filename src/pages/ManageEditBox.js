import { useNavigate } from "react-router-dom";
import React from "react";
import { useParams } from 'react-router-dom';
import { BoxCard, CreateNewBoxCard } from "../components/BoxCard";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { getUserToken } from "../utils/userToken";
import { useToast } from "@chakra-ui/react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import AlertModal from "../components/AlertModal";
import Paper from "@mui/material/Paper";
import AlertTable from "../components/AlertTable";


function ManageEditBox(props){
    const navigate = useNavigate();
    
    const defaultTheme = createTheme();
    const [ alertItems, setAlertItems ] = useState([]);
    const toast = useToast();
    const [updateList, setUpdateList] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { boxId } = useParams();

    useEffect(() =>{
        const userToken = getUserToken();
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/alert/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
				userToken: userToken,
                boxId: boxId,
			}),
        }).then(response => response.json()).then(response =>{
            if(response.status === "FAIL"){
                return console.log("> ShowAlertList : " + response.message);
            }

            if(response.status === "OK"){
                setAlertItems(response.data.results);
            }
        });
    }, [updateList]); 

    return(
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <main> 
                    <Container sx={{ pt: 5, textAlign: "right" }} maxWidth="lg">
                        <Button variant="contained" onClick={onOpen}>
                            <i className="fa-solid fa-plus"></i> &nbsp; New Alert
                        </Button>
                        <AlertModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} update={setUpdateList} mode={"create"} boxId={boxId} />
                    </Container>
                    <Container sx={{ py: 5 }} maxWidth="lg">
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                                <AlertTable rows={alertItems} boxId={boxId} update={setUpdateList} />
                            </Paper>
                        </Grid>
                    </Container>
                </main>
            </ThemeProvider>
        </>
    );
}



export default ManageEditBox;