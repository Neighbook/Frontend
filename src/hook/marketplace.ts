import type {AxiosError, GenericAbortSignal} from "axios";
import {marketplaceApi} from "./neighbookApi";

export interface Offre {
    idOffre: number,
    libelleOffre: string,
    descriptionOffre: string,
    image: string,
}

export const getOffres = async (signal: GenericAbortSignal): Promise<Array<Offre> | null> => {
    const apiRes = await marketplaceApi.get("offres", {signal: signal});
    // const apiRes = await fetch("https://demo.neighbook.tech/api/v0/marketplace/offres");
    if(apiRes.status === 200) {
        return apiRes.data as Array<Offre>;
    }
    return null;
};

export const postOffre = async (data: Offre, signal: GenericAbortSignal): Promise<string|null> => {
    try {
        const apiRes = await marketplaceApi.post("offre", data, {signal: signal});
        if(apiRes.status !== 200) {
            return apiRes.data as string;
        }
    } catch(err) {
        return (err as AxiosError).message;
    }
    return null;
};