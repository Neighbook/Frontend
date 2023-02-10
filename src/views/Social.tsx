import React, {useEffect, useState} from 'react';
import {Box, Container} from '@mui/material';
import { SocialPost } from '../components/SocialPost';
import type {Post} from "../hook/social";
import { getFeed} from "../hook/social";

const Social = () => {
    const [feed, setFeed] = useState<Array<Post> | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        getFeed(controller.signal).then(res => { setFeed(res); }).catch(()=>null);
        return () => {
            controller.abort();
        };
    }, []);

    if (feed === null) {
        return <p>loading</p>;
    }
    return (<Container component="main" maxWidth="md">
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            {feed.map(post=><SocialPost post={post} sx={{mb: 3}} key={post.id}/>)}
        </Box>
    </Container>);
};

export default Social;
