import React, { useEffect, useState } from "react";
import {Box, Button, Container, Skeleton} from "@mui/material";
import { SocialPost } from "../components/SocialPost";
import type { Post } from "../hook/social";
import {getFeed, getPost, removePost} from "../hook/social";
import InfiniteScroll from "react-infinite-scroller";
import {useNavigate, useParams} from "react-router";
import { PostComments } from "./PostComments";
import {FeedLoading} from "../components/Loading";
import {NewEvent} from "./NewEvent";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Social = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [repost, setRepost] = useState<Post | null>(null);
    const [newPostModal, setNewPostModal] = useState(false);
    const itemsPerPage = 5;
    const [hasMore, setHasMore] = useState(true);
    const [records, setrecords] = useState(0);
    const [feed, setFeed] = useState<Array<Post> | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        getFeed(controller.signal)
            .then((res) => {
                setFeed(res);
            })
            .catch(() => null);
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        setPost(null);
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

    const handlePostRemove = (post: Post) => {
        setrecords(records-1);
        setFeed(feed?.filter(p=>p.id!==post.id) ?? null);
        removePost(post).then(()=>null).catch(()=>null);
    };

    const handleRepost = (post: Post) => {
        setRepost(post);
        setNewPostModal(true);
    };

    const handleNewPost = (post: Post) => {
        if(feed) {
            const copyFeed = [...feed];
            copyFeed.unshift(post);
            setFeed(copyFeed);
        }
    };

    const renderPosts = (data: Array<Post>) => {
        const items = [];
        let post;
        for (let i = 0; i < records; i++) {
            post = data[i];
            items.push(<SocialPost post={post} sx={{ mb: 3 }} key={post.id} onPostRemove={handlePostRemove} onRepost={handleRepost}/>);
        }
        return items;
    };

    const renderPost = (post: Post) => {
        return (
            <>
                <SocialPost post={post} sx={{mb: 2}} fullSize onPostRemove={(post: Post)=>{
                    setPost(null);
                    handlePostRemove(post);
                    navigate('/social');
                }} onRepost={handleRepost}/>
                <PostComments post={post}/>
            </>
        );
    };

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {feed?<InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    style={{width: "100%"}}
                    loader={<Box key="loader" sx={{ width: '100%' }}><Skeleton height={50}/></Box>}
                >
                    {post?renderPost(post):renderPosts(feed)}
                </InfiniteScroll>:<FeedLoading/>}
            </Box>
            <div>
                {!post&&!newPostModal&&<Button
                    onClick={() => {
                        setRepost(null);
                        setNewPostModal(true);
                    }}
                    sx={{
                        position: "fixed",
                        bottom: '1rem',
                        right: '1rem',
                        borderRadius: '50%',
                    }}
                >
                    <AddCircleIcon sx={{fontSize: '4rem'}}/>
                </Button>}
                <NewEvent open={newPostModal} handleClose={() => {setNewPostModal(false);}} repost={repost} onPost={handleNewPost}/>
            </div>
        </Container>);
};

export default Social;
