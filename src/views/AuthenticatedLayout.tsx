import * as React from 'react';
import SideBar from "../components/SideBar";
import Box from "@mui/material/Box";
import {useAuth} from "../components/AuthProvider";
import {Navigate, useLocation} from "react-router";

const drawerWidth = 280;

interface Props{
    children: JSX.Element | string
}

export const AuthenticatedLayout = ({ children }: Props) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn()) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return (
        <Box sx={{display: 'flex'}}>
            <Box
                component="nav"
                sx={{width: {sm: 280}, flexShrink: {sm: 0}}}
            >
                <SideBar />
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                {children}
            </Box>
        </Box>
    );
};
