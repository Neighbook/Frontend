import { Typography } from "@mui/material";


export type User = {
	profilePictureSrc: string;
	name: string;
}

type Props = User

export default function ChatProfile({ profilePictureSrc, name }: Props) {
    return (
        <div>
            <img src={profilePictureSrc} alt={name} />
            <Typography variant="h3" noWrap component="div">
                {name}
            </Typography>
        </div> 
    );
}
