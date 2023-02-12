import React, {useEffect, useState} from 'react';
import {Box, Container} from '@mui/material';
import { SocialPost } from '../components/SocialPost';
import type {Post} from "../hook/social";
import {getFeed, getPost} from "../hook/social";
import InfiniteScroll from 'react-infinite-scroller';
import {useParams} from "react-router";
import {PostComments} from "./PostComments";


const Social = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    const itemsPerPage = 5;
    const [hasMore, setHasMore] = useState(true);
    const [records, setrecords] = useState(0);
    const [feed, setFeed] = useState<Array<Post> | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        getFeed(controller.signal).then(res => { setFeed(res); }).catch(()=>null);
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        if(postId !== "" && postId !== undefined && feed){
            setPost(feed.find(post=>post.id===postId) ?? null);
            getPost(postId, controller.signal).then(p=>{ setPost(p); }).catch(()=>null);
        }
        return () => {
            controller.abort();
        };
    }, [postId, feed]);

    const loadMore = () => {
        const dataLength = feed?.length ?? 0;
        if (records === feed?.length) {
            setHasMore(false);
        } else {
            setrecords(records + itemsPerPage > dataLength ? dataLength : records + itemsPerPage);
        }
    };

    if (feed === null) {
        return <p>loading</p>;
    }

    const renderPosts = (data: Array<Post>) => {
        const items = [];
        let post;
        for (let i = 0; i < records; i++) {
            post = data[i];
            items.push(<SocialPost post={post} sx={{mb: 3}} key={post.id}/>);
        }
        return items;
    };

    if(postId !== "" && postId !== undefined && post){
        return (
            <>
                <SocialPost post={post} sx={{}} fullSize/>
                <PostComments commentaires={post.commentaires}/>
            </>
        );
    }

    return (<Container component="main" maxWidth="md">
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                {renderPosts(feed)}
            </InfiniteScroll>
        </Box>
    </Container>);
};

export default Social;
