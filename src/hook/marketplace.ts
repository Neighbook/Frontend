import type {GenericAbortSignal} from "axios";
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