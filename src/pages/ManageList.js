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
import CreateNewBoxModal from "../components/CreateNewBoxModal";


function ManageList(){
    const defaultTheme = createTheme();
    const [ boxItems, setBoxItems ] = useState([]);
    const toast = useToast();
    const [updateList, setUpdateList] = useState(0);

    useEffect(() =>{
        const userToken = getUserToken();
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/box/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
				userToken: userToken,
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
                setBoxItems(response.data.results);
                console.log(response.data.results);
            }
        });
    }, [updateList]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <main> 
                    <Container sx={{ pt: 5, textAlign: "right" }} maxWidth="lg">
                        <Button variant="contained" onClick={onOpen}>
                            <i className="fa-solid fa-plus"></i> &nbsp; New Box
                        </Button>
                        <CreateNewBoxModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} update={setUpdateList} />
                    </Container>
                    <Container sx={{ py: 5 }} maxWidth="lg">
                        {boxItems.length !== 0 ? 
                           <Grid container spacing={5}>
                                {boxItems.map((boxInfo,i) => (
                                    <BoxCard key={i} boxName={boxInfo.box_name} boxId={boxInfo.box_id} update={setUpdateList} />
                                ))}
                            </Grid>
                            :
                            <div className="text-center text-3xl text-gray-600 my-10">Nothing To Show Here</div>
                        }
                        
                    </Container>
                </main>
            </ThemeProvider>
        </>
    )
}



export default ManageList;