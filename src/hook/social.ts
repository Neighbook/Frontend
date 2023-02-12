import {socialApi} from "./neighbookApi";
import type {GenericAbortSignal} from "axios";

interface Image{
    id: string
    url: string
}

export interface Commentaire{
    id: string
    idUtilisateur: string
    contenu: string
    idCommentaire?: string
    dateDeCreation: string
}

export interface NombreReactions{
    like: number
    mdr: number
    Oo: number
    snif: number
    grr: number
    ok: number
}


export interface Post{
    id: string
    titre: string
    description: string
    estPartage: boolean
    idUtilisateur: string
    dateDeCreation: Date
    dateDeModification: Date
    commentaires?: Array<Commentaire>
    ncommentaires: number
    reactionUtilisateur: number
    images: Array<Image>
    evenement: {}
    nombreReactions: NombreReactions
}

export const getFeed = async (signal: GenericAbortSignal): Promise<Array<Post> | null> => {
    const apiRes = await socialApi.get("feed", {signal: signal});
    if(apiRes.status === 200){
        return apiRes.data as Array<Post>;
    }
    return null;
};

export const getPost = async (id: string, signal: GenericAbortSignal): Promise<Post | null> => {
    const apiRes = await socialApi.get("post", {signal: signal, params:{id}});
    if(apiRes.status === 200){
        return apiRes.data as Post;
    }
    return null;
};

export const postComment = async (idPost: string, contenu: string, idCommentaire: string | null): Promise<Commentaire> => {
    const apiRes = await socialApi.post("comment", {idPost, contenu, idCommentaire});
    if(apiRes.status === 200){
        return apiRes.data as Commentaire;
    }
    throw Error('impossible de commenter');
};

export const deleteComment = async (id: string): Promise<void> => {
    const apiRes = await socialApi.delete("comment", {params:{id}});
    if(apiRes.status === 200){
        return;
    }
    throw Error('impossible de supprimer');
};

export const updateReaction = async (reactionId: number | null, postId: string): Promise<void> => {
    await socialApi.patch("reaction", {reactionId, postId});
};