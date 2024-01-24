import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import ManageList from "../pages/ManageList";
import ManageEditBox from "../pages/ManageEditBox";
import AppLayout from "../pages/layout/AppLayout";
import { Redirect } from "../utils/Redirect";

function Routers(){
    return(
        <Routes>
            <Route 
                path={'/'} 
                element={
                    <Redirect to={"/home"} />
                } 
            />
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
                path={'/manage/b/:boxId'} 
                element={
                    <AppLayout>
                        <ManageEditBox />
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