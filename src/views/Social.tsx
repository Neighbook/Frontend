import React from 'react';
import {Box, Typography} from '@mui/material';
import { SocialPost } from '../components/SocialPost';
const Social = () => (
    <Box
        ml={10}
        mr={10}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <SocialPost/>
    </Box>
);

export default Social;
