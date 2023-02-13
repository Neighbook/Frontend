import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Fade, IconButton, ImageList, ImageListItem, Modal, Popover} from "@mui/material";
import {useAuth} from "./AuthProvider";
import type {Post, NombreReactions} from "../hook/social";
import defaultPfp from "/asset/images/pfp.png";
import {useNavigate} from "react-router";
import {useState} from "react";
import {updateReaction} from "../hook/social";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {relativeDateComment} from "../utils/Date";

interface props{
    post: Post
    sx: {}
    onPostRemove: Function
    fullSize?: boolean
}

export const SocialPost = ({post, sx, fullSize=false, onPostRemove}: props) => {
    const {usersBase, currentUser} = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [imgModal, setImgModal] = useState<string | null>(null);
    const [nombreReactions, setNombreReactions] = React.useState<NombreReactions>(post.nombreReactions);
    const [reactionUtilisateur, setReactionUtilisateur] = React.useState<Number|null>(post.reactionUtilisateur);
    const author = usersBase?.find(user=>user.id === post.idUtilisateur);

    const setUserReaction = (newReaction: number) => {
        const remove = newReaction === reactionUtilisateur;
        const newReactions = nombreReactions;
        Object.keys(nombreReactions).forEach((reaction, index) => {
            if (index + 1 === newReaction) {
                newReactions[reaction as keyof NombreReactions] += remove ? -1 : 1;
            } else if (index + 1 === reactionUtilisateur) {
                newReactions[reaction as keyof NombreReactions] += -1;
            }
        });
        setReactionUtilisateur(remove ? null : newReaction);
        setNombreReactions(newReactions);
        updateReaction(remove ? null : newReaction, post.id).then(() => null).catch(()=>null);
    };


    return (
        <Card sx={{boxShadow: '10', borderRadius: '10px', width: '100%', ...sx}}>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={anchorEl!==null}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={()=>{setAnchorEl(null);}}
                disableRestoreFocus
            >
                <Typography>{author?.nom_utilisateur}</Typography>
            </Popover>
            <CardHeader
                avatar={
                    <Avatar src={author?.photo ?? defaultPfp}
                        onMouseEnter={(e)=> {
                            setAnchorEl(e.currentTarget);
                        }}
                        onMouseLeave={()=> {
                            setAnchorEl(null);
                        }}
                        onClick={()=>{
                            navigate(`/user/${author?.id ?? ''}`);
                        }}
                        sx={{'&:hover': {cursor: "pointer"}}}
                    />
                }
                action={
                    <>
                        {fullSize&&<IconButton onClick={() => {
                            navigate("/social");
                        }}>
                            <ArrowBackIosNewIcon/>
                        </IconButton>}
                        {author?.id===currentUser?.id&&<IconButton aria-label="delete" onClick={()=>{onPostRemove(post);}}>
                            <DeleteOutlineIcon color="error"/>
                        </IconButton>}
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </>
                }
                title={post.titre}
                subheader={relativeDateComment(new Date(post.dateDeCreation))}
            />
            {post.images.length>0&&<CardMedia>
                <ImageList sx={{ ml: 2, mr: 2}} cols={post.images.length===1?1:2} rowHeight={12 * parseFloat(getComputedStyle(document.documentElement).fontSize)}>
                    {post.images.map((image, index) => (
                        <ImageListItem key={image.id} rows={post.images.length===2||(index===0&&post.images.length%2!==0)?2:1}>
                            <img
                                alt='post'
                                src={image.url}
                                style={{borderRadius: '10px', height:"100%", objectFit: "cover"}}
                                loading="lazy"
                                onClick={()=> {
                                    setImgModal(image.url);
                                    setOpenModal(true);
                                }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </CardMedia>}
            <CardContent onClick={() => { navigate(`/post/${post.id}`); }} sx={{'&:hover': {cursor: "pointer"}}}>
                <Typography variant="body2" color="text.secondary">
                    {post.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like" onClick={()=> {setUserReaction(1);}}>
                    {nombreReactions.like || ''}
                    <FavoriteBorderOutlinedIcon sx={reactionUtilisateur===1?{color: "#ff5656"}:{}}/>
                </IconButton>
                <IconButton aria-label="mdr" onClick={()=>{setUserReaction(2);}}>
                    {nombreReactions.mdr || ''}
                    <SentimentVerySatisfiedOutlinedIcon sx={reactionUtilisateur===2?{color: "#efb81a"}:{}}/>
                </IconButton>
                <IconButton aria-label="Oo" onClick={()=>{setUserReaction(3);}}>
                    {nombreReactions.Oo || ''}
                    <SentimentVerySatisfiedIcon sx={reactionUtilisateur===3?{color: "#efb81a"}:{}}/>
                </IconButton>
                <IconButton aria-label="snif" onClick={()=>{setUserReaction(4);}}>
                    {nombreReactions.snif || ''}
                    <SentimentDissatisfiedIcon sx={reactionUtilisateur===4?{color: "#efb81a"}:{}}/>
                </IconButton>
                <IconButton aria-label="grr" onClick={()=>{setUserReaction(5);}}>
                    {nombreReactions.grr || ''}
                    <SentimentVeryDissatisfiedOutlinedIcon sx={reactionUtilisateur===5?{color: "#ea7907"}:{}}/>
                </IconButton>
                <IconButton aria-label="ok" onClick={()=>{setUserReaction(6);}}>
                    {nombreReactions.ok || ''}
                    <ThumbUpOutlinedIcon sx={reactionUtilisateur===6?{color: "#5085ee"}:{}}/>
                </IconButton>
                <IconButton aria-label="comment" sx={{marginLeft: 'auto'}}
                    onClick={() => { navigate(`/post/${post.id}`); }} disabled={fullSize}>
                    {post.ncommentaires || ''}
                    <ChatBubbleOutlineOutlinedIcon color="secondary"/>
                    {!fullSize&&<ExpandMoreIcon/>}
                </IconButton>
            </CardActions>
            <Modal
                open={openModal}
                onClose={()=>{ setOpenModal(false); }}
                closeAfterTransition
                sx={{display: "flex", alignItems: "center", justifyContent: "center"}}
            >
                <Fade in={openModal}>
                    <img
                        src={imgModal ?? ""}
                        alt="modal"
                        onClick={()=>{ setOpenModal(false); }}
                        style={{ height: "80%", maxWidth: "90%", outline: "none", objectFit: 'contain' }}
                    />
                </Fade>
            </Modal>
        </Card>
    );
};
