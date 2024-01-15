import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


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
                path={'*'} 
                element={
                    <div className="flex justify-center">Not Found</div>
                } 
            />
		</Routes>
    );
}


export default Routers;