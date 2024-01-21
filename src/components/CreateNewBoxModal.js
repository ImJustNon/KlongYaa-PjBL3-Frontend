import { useDisclosure, useToast, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import { Button, Modal } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { getUserToken } from "../utils/userToken";

function CreateNewBoxModal({ isOpen, onOpen, onClose, update }) {
    const toast = useToast();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [ inputBoxId, setInputBoxId ] = useState("");
    const [ inputBoxName, setInputBoxName ] = useState("");

    function haddleSave(){
        if(inputBoxId.length === 0 || inputBoxName === 0) return;
        const userToken = getUserToken();
        fetch("https://klongyaa-pjbl3-backend.vercel.app/api/box/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				boxId: inputBoxId,
                boxName: inputBoxName,
                userToken: userToken
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
        });
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
                    <ModalHeader>Register a new Box</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Box's ID :</FormLabel>
                            <Input ref={initialRef} placeholder='ID Here' onChange={(event) => setInputBoxId(event.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Box's Name : </FormLabel>
                            <Input placeholder='Name Here' onChange={(event) => setInputBoxName(event.target.value)} />
                        </FormControl>
                    </ModalBody>
        
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => haddleSave()}>
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

export default CreateNewBoxModal;