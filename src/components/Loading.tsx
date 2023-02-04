import * as React from 'react';
import Box from '@mui/material/Box';
import {Skeleton} from "@mui/material";

export const CompteLoading = () => (
    <Box sx={{ width: '100%' }}>
        <Skeleton variant="text" sx={{ fontSize: '1rem', width: "50%", mb: 5}} />
        <Skeleton variant="circular" sx={{width: "20vh", height: "20vh", mb: 5}}/>
        <Skeleton variant="rectangular" sx={{width: "80%", height: "5vh", mb: 3}} />
        <Skeleton variant="rectangular" sx={{width: "80%", height: "5vh", mb: 3}} />
        <Skeleton variant="rectangular" sx={{width: "80%", height: "5vh", mb: 3}} />
        <Skeleton variant="rectangular" sx={{width: "80%", height: "5vh", mb: 3}} />
    </Box>
);
