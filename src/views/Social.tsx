import React, {useEffect, useState} from 'react';
import {Box, Container, Fade, Modal} from '@mui/material';
import { SocialPost } from '../components/SocialPost';
import type {Post} from "../hook/social";
import { getFeed} from "../hook/social";

const Social = () => {
    const [feed, setFeed] = useState<Array<Post> | null>(null);
    const [imgModal, setImgModal] = useState<string | null>(null);

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

            {feed.map(post=><SocialPost post={post} sx={{mb: 3}} key={post.id} setImgModal={(img: string)=>{ setImgModal(img); }}/>)}
        </Box>
        <Modal
            open={imgModal !== null}
            onClose={()=>{ setImgModal(null); }}
            closeAfterTransition
            sx={{display: "flex", alignItems: "center", justifyContent: "center"}}
        >
            <Fade in={imgModal !== null}>
                <img
                    src={imgModal ?? ""}
                    alt="asd"
                    style={{ maxHeight: "90%", maxWidth: "90%", outline: "none" }}
                />
            </Fade>
        </Modal>
    </Container>);
};

export default Social;
