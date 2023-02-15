import {marketplaceApi} from "./neighbookApi";
import type { GenericAbortSignal } from "axios";

interface Image {
    id: string;
    url: string;
}

interface TypeOffre {
    id: number;
    libelle: string;
}

interface Tag {
    id: number,
    libelle: string,
}

export interface Offre {
    id: number;
    idUtilisateur: string;
    title: string;
    date: Date;
    description: string;
    prix: number;
    images: Array<Image>;
    isActive: boolean;
    typeOffre: TypeOffre;
    tags: Array<Tag>;

}

export const addOffre = async (
    titre: string,
    description: string,
    prix: number,
    isActive = false,
    typeOffre: number,
    tags: Array<number>,
): Promise<Offre> => {
    const apiRes = await marketplaceApi.post("post", {
        titre,
        description,
        isActive,
        // typeOffre,
        // tags
    });
    if (apiRes.status === 200) {
        return apiRes.data as Offre;
    }
    throw Error("Error creating offre");
};

export const removeOffre = async (offre: Offre): Promise<void> => {
    await Promise.all(offre.images.map(async(img)=>{
        const res = await marketplaceApi.delete('image', {params: {id: img.id}});
        return res.status;
    }));
    await marketplaceApi.delete('post', {params: {id: offre.id}});
};

export const addOffreImage = async (offreId: string, file: File): Promise<Image> => {
    const apiRes = await marketplaceApi.post("image/"+offreId, {file}, {headers: {
            'Content-Type': 'multipart/form-data'
        }});
    if(apiRes.status === 200){
        return apiRes.data as Image;
    }
    throw Error('error while uploading file');
};

export const getFeed = async (signal: GenericAbortSignal): Promise<Array<Offre> | null> => {
    const apiRes = await marketplaceApi.get("feed", {signal: signal});
    if(apiRes.status === 200){
        return apiRes.data as Array<Offre>;
    }
    return null;
};

export const getOffre = async (offreId: string, signal: GenericAbortSignal): Promise<Offre | null> => {
    const apiRes = await marketplaceApi.get("post", {signal: signal, params:{offreId}});
    if(apiRes.status === 200){
        return apiRes.data as Offre;
    }
    return null;
};

export const toggleOffre = async(offreId: string, toggle: boolean): Promise<void> => {
    const apiRes = await marketplaceApi.patch("toggle", {offreId, toggle})
}