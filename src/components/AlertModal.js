import { useDisclosure, useToast, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import { Button, Modal } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { getUserToken } from "../utils/userToken";
import { convertToTimestamp } from "../utils/convertToTimestamp";
import { getTemp, removeTemp } from "../utils/tempData";

function AlertModal({ isOpen, onOpen, onClose, update, mode, boxId }) {
    const toast = useToast();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [alertName, setAlertName] = useState("");
    const [alertTime, setAlertTime] = useState("");
    const [alertLedChannelId, setAlertLedChannelId] = useState([]);


    function handleCovertToTimestamp(event){
        setAlertTime(convertToTimestamp(event.target.value));
    }
    function handleConvertNumberToArray(number){
        let numberStr = number.toString();
        const numberArray = numberStr.split('');
        let uniqueDigits = [];
        numberArray.forEach(digit => {
            if (!uniqueDigits.includes(digit) && digit >= 1 && digit <= 6) {
                uniqueDigits.push(digit);
            }
        });
        setAlertLedChannelId(uniqueDigits);
    }
    function handleSave(mode){
        if(mode === "create"){
            if(!alertName || !alertTime || !alertLedChannelId) return;
            const userToken = getUserToken();
            fetch("https://klongyaa-pjbl3-backend.vercel.app/api/alert/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    alertName: alertName,
                    alertTime: alertTime,
                    userToken: userToken,
                    boxId: boxId,
                    ledChannelId: alertLedChannelId,
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
                    onClose();
                    update(Math.random());
                    return toast({
                        title: response.message,
                        status: "success",
                        isClosable: true,
                        position: "bottom-right",
                        duration: 1500,
                    });
                }
            })
        }
        if(mode === "edit"){
            const userToken = getUserToken();
            const alertId = getTemp();
            if(alertName.length > 0){
                fetch("https://klongyaa-pjbl3-backend.vercel.app/api/alert/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userToken: userToken,
                        boxId: boxId,
                        alertId: alertId,
                        update: "alertname",
                        data: alertName
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
                    toast({
                        title: response.message,
                        status: "success",
                        isClosable: true,
                        position: "bottom-right",
                        duration: 1500,
                    });
                });
            }
            if(String(alertTime).length > 0){
                fetch("https://klongyaa-pjbl3-backend.vercel.app/api/alert/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userToken: userToken,
                        boxId: boxId,
                        alertId: alertId,
                        update: "alerttime",
                        data: alertTime
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
                    toast({
                        title: response.message,
                        status: "success",
                        isClosable: true,
                        position: "bottom-right",
                        duration: 1500,
                    });
                });
            }
            if(alertLedChannelId.length > 0){
                fetch("https://klongyaa-pjbl3-backend.vercel.app/api/alert/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userToken: userToken,
                        boxId: boxId,
                        alertId: alertId,
                        update: "alertledchannel",
                        data: alertLedChannelId
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
                    toast({
                        title: response.message,
                        status: "success",
                        isClosable: true,
                        position: "bottom-right",
                        duration: 1500,
                    });
                });
            }
            onClose();
            removeTemp();
            update(Math.random());
            console.log(Math.random())
        }
    }
  
    return (
        <>
            <ChakraProvider>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{mode === "create" ? "create" : "Edit"} Alert</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Alert Name :</FormLabel>
                            <Input id="input_alert_name" ref={initialRef} placeholder='Name Here' onChange={(event) => setAlertName(event.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Alert Time : </FormLabel>
                            <Input id="input_alert_time" type="datetime-local" placeholder='Time Here' onChange={(event) => handleCovertToTimestamp(event)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>LED Channel : </FormLabel>
                            <Input id="input_led_channel" type="number" placeholder='Use space for multi channel' onChange={(event) => handleConvertNumberToArray(event.target.value)} />
                        </FormControl>
                    </ModalBody>
        
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleSave(mode)}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
            </ChakraProvider>
        </>
    );
}

export default AlertModal;