import * as React from 'react';
import SideBar from "../components/SideBar";
import Box from "@mui/material/Box";

const drawerWidth = 280;

interface Props{
    children: never;
}

export const Layout = ({ children }: Props) => (
    <Box sx={{display: 'flex'}}>
        <Box
            component="nav"
            sx={{width: {sm: 280}, flexShrink: {sm: 0}}}
        >
            <SideBar/>
        </Box>
        <Box
            component="main"
            sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
        >
            {children}
        </Box>
    </Box>
);
