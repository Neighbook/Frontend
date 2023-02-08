import * as React from 'react';
import Box from '@mui/material/Box';
import {Skeleton} from "@mui/material";

export const CompteLoading = () => (
    <Box sx={{ width: '100%' }} ml={5} mr={5}>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: "200px", mb: 0.2}} />
        <Skeleton variant="text" sx={{ fontSize: '1.3rem', width: "500px", mb: 5}} />
        <Skeleton variant="circular" sx={{width: "20vh", height: "20vh", minHeight: "200px", minWidth: "200px", mb: 10, ml: 2, aspectRatio: "1/1"}}/>
        <Skeleton variant="rectangular" sx={{width:"650px", height: "60px", mb: 3}} />
        <Skeleton variant="rectangular" sx={{width:"650px", height: "60px", mb: 3}} />
        <Skeleton variant="rectangular" sx={{width:"650px", height: "60px", mb: 3}} />
        <Skeleton variant="rectangular" sx={{width:"650px", height: "60px", mb: 3}} />
    </Box>
);
