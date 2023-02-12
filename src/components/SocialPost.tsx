import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IconButton, ImageList, ImageListItem} from "@mui/material";
import {useAuth} from "./AuthProvider";
import type {Post} from "../hook/social";
import defaultPfp from "/asset/images/pfp.png";

interface props{
    post: Post
    sx: {}
    setImgModal: Function
}

const dateFormatter = new Intl.RelativeTimeFormat('fr-FR', {
    numeric: 'always',
    style: 'long'
});

export const SocialPost = ({post, sx, setImgModal}: props) => {
    const {usersBase} = useAuth();
    const author = (usersBase?.find(user=>user.id === post.idUtilisateur)?.photo) ?? defaultPfp;
    const relativeDay = new Date().getDay() - new Date(post.dateDeCreation).getDay();
    const relativeHour = new Date().getHours() - new Date(post.dateDeModification).getHours();
    return (
        <Card sx={{boxShadow: '10', borderRadius: '10px', width: '100%', ...sx}}>
            <CardHeader
                avatar={
                    <Avatar src={author} />
                }
                action={
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                }
                title={post.titre}
                subheader={relativeDay === 0 ? dateFormatter.format(relativeHour, 'hours') : dateFormatter.format(relativeDay, 'day')}
            />
            {post.images.length>0&&<CardMedia>
                <ImageList sx={{ ml: 2, mr: 2}} cols={post.images.length===1?1:2}>
                    {post.images.map((image) => (
                        <ImageListItem key={image.id}>
                            <img
                                alt='post'
                                src={image.url}
                                style={{borderRadius: '10px', maxHeight: post.images.length===1?"20em":"10em", objectFit: "cover"}}
                                loading="lazy"
                                onClick={()=> {
                                    setImgModal(image.url);
                                }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </CardMedia>}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <SentimentVerySatisfiedIcon />
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <SentimentDissatisfiedIcon />
                </IconButton>

                <ExpandMoreIcon sx={{marginLeft: 'auto'}}/>
            </CardActions>
        </Card>
    );
};
