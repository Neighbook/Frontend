import React, { useEffect, useState } from "react";
import {Box, Button, Container} from "@mui/material";
import { SocialPost } from "../components/SocialPost";
import type { Post } from "../hook/social";
import {getFeed, getPost, removePost} from "../hook/social";
import {useNavigate, useParams} from "react-router";
import { PostComments } from "../components/PostComments";
import {FeedLoading} from "../components/Loading";
import {NewEvent} from "../components/NewEvent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Feed from "../components/Feed";

const Social = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [repost, setRepost] = useState<Post | null>(null);
    const [newPostModal, setNewPostModal] = useState(false);
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

    const handlePostRemove = (post: Post) => {
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

    const renderPost = (post: Post) => {
        return (
            <Box sx={{width: "100%"}}>
                <SocialPost post={post} sx={{mb: 2}} fullSize onPostRemove={(post: Post)=>{
                    setPost(null);
                    handlePostRemove(post);
                    navigate('/social');
                }} onRepost={handleRepost}/>
                <PostComments post={post}/>
            </Box>
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
                <>{!feed&&<FeedLoading/>}</>
                {post?renderPost(post):feed&&<Feed posts={feed} handlePostRemove={handlePostRemove} handleRepost={handleRepost}/>}
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
