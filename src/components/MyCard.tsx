import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type {FunctionComponent} from "react";

interface MyCardProps {
    id: number,
    sx?: object,
    title: string,
    text: string,
    renderCardActions?: JSX.Element,
    buttonName?: string,
    action?: Function,
    image: string
}

const MyCard : FunctionComponent<MyCardProps> = ({
    sx,
    title="",
    text="",
    renderCardActions,
    action = () => {console.log('action');},
    id,
    buttonName,
    image
}) => {
    return (
        <Card sx={sx}>
            <CardMedia
                component="img"
                height="200"
                image={image}
                title="ad-picture"
                alt="ad-picture"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
            <CardActions>
                {renderCardActions ? (
                    renderCardActions
                ) : (
                    <Button size="small" onClick={() => {action(id);}}>{buttonName}</Button>
                )}
            </CardActions>
        </Card>
    );
};
export default MyCard;