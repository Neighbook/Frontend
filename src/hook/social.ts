import {socialApi} from "./neighbookApi";
import type {GenericAbortSignal} from "axios";

interface Image{
    id: string
    url: string
}

export interface Post{
    id: string
    titre: string
    description: string
    estPartage: boolean
    idUtilisateur: string
    dateDeCreation: Date
    dateDeModification: Date
    commentaires: []
    ncommentaires: number
    reactionUtilisateur: number
    images: Array<Image>
    evenement: {}
    nombreReactions: {
        like: number
        mdr: number
        Oo: number
        snif: number
        grr: number
        ok: number
    }
}

export const getFeed = async (signal: GenericAbortSignal): Promise<Array<Post> | null> => {
    const apiRes = await socialApi.get("feed", {signal: signal});
    if(apiRes.status === 200){
        return apiRes.data as Array<Post>;
    }
    return null;
};