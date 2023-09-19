import * as React from "react";
import type {User} from "../hook/user";
import Typography from "@mui/material/Typography";
import {Popover, Popper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router";
import defaultPfp from "/asset/images/pfp.png";

interface props{
    user: User
}
export const UserAvatar = ({user}: props) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const navigate = useNavigate();
    const handleBrokenImage = (e:React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = defaultPfp;
    };

    return (
        <>
            <Popper
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={anchorEl!==null}
                anchorEl={anchorEl}
            >
                <Typography>{user.nom_utilisateur}</Typography>
            </Popper>
            <Avatar src={user.photo ?? defaultPfp}
                imgProps={{ onError: handleBrokenImage }}
                onMouseEnter={(e)=> {
                    setAnchorEl(e.currentTarget);
                }}
                onMouseLeave={()=> {
                    setAnchorEl(null);
                }}
                onClick={(event)=>{
                    event.stopPropagation();
                    navigate(`/user/${user.id ?? ''}`);
                }}
                sx={{'&:hover': {cursor: "pointer"}}}
            />
        </>
    );
};