import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import { ManageBox, ManageList } from "../pages/Manage";
import AppLayout from "../pages/layout/AppLayout";


function Routers(){
    return(
        <Routes>
            <Route 
                path={'/signin'} 
                element={
                    <SignIn />
                } 
            />
            <Route 
                path={'/signup'} 
                element={
                    <SignUp />
                } 
            />
            <Route 
                path={'/home'} 
                element={
                    <AppLayout>
                        <Home />
                    </AppLayout>
                } 
            />
            <Route 
                path={'/manage'} 
                element={
                    <AppLayout>
                        <ManageList />
                    </AppLayout>
                } 
            />
            <Route 
                path={'/manage/:boxId'} 
                element={
                    <AppLayout>
                        <ManageBox />
                    </AppLayout>
                } 
            />
            <Route 
                path={'*'} 
                element={
                    <div className="flex justify-center">Not Found</div>
                } 
            />
		</Routes>
    );
}


export default Routers;