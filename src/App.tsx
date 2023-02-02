import React from 'react';
import {
    Routes,
    Route,
} from 'react-router';

import {
    Marketplace,
    PageNotFound,
    Acceuil,
    Messagerie,
    Social
} from './views';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import SideBar from "./components/SideBar";
import {createTheme, ThemeProvider} from "@mui/material";

const drawerWidth = 280;

const theme = createTheme({
    typography: {
        fontFamily: 'Raleway'
    }
});

const App = () => (
    <ThemeProvider theme={theme}>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
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
                <Routes>
                    <Route path="/">
                        <Route index element={<Acceuil />} />
                        <Route path="marketplace" element={<Marketplace />} />
                        <Route path="social" element={<Social />} />
                        <Route path="messagerie" element={<Messagerie />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </Box>
        </Box>
    </ThemeProvider>
);


export default App;
