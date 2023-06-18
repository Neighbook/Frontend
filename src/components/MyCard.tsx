import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FunctionComponent} from "react";

interface MyCardProps {
    id: number,
    sx: object,
    title: string,
    text: string,
    renderCardActions?: JSX.Element,
    buttonName: string,
    action: Function,

}

const MyCard : FunctionComponent<MyCardProps> = ({
    sx,
    title="",
    text="",
    renderCardActions,
    action,
    id,
    buttonName
}) => {
    return (
        <Card sx={sx}>
            <CardMedia
                component="img"
                height="200"
                image={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.moneycrashers.com%2Fwp-content%2Fuploads%2F2019%2F03%2Ffind-good-babysitter.jpg&f=1&nofb=1&ipt=22c754cdf82932bbfe83c8937030f3bdc526af44ec2b9339284df8da9c8f601c&ipo=images'}
                title="market-add"
                alt="market-add"
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
                    <Button size="small" onClick={() => {action(id)}}>{buttonName}</Button>
                )}
            </CardActions>
        </Card>
    );
};
export default MyCard;