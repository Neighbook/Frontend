import * as React from 'react';
import {Box} from "@mui/material";
import type {Commentaire} from "../hook/social";

interface props{
    commentaires: Array<Commentaire>
}

export const PostComments = ({commentaires}:props) => (
    <Box ml={5} mr={5}>
        <h1>comment</h1>
    </Box>
);