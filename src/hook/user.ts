import {userApi} from "./neighbookApi";
import type {GenericAbortSignal} from "axios";

export interface User{
    id?: string;
    prenom?: string;
    nom?: string;
    sexe?: string;
    nom_utilisateur?: string;
    date_naissance?: string;
    email?: string;
    password?: string;
    telephone?: string;
    code_pays?: string;
    photo?: string;
    date_creation?: Date;
    date_modification?: Date;
    date_suppression?: Date;
    actif?: boolean;
}

export const getUser = async (user_id: string, signal: GenericAbortSignal): Promise<User | null> => {
    const apiRes = await userApi.get(user_id, {signal: signal});
    if(apiRes.status === 200){
        return apiRes.data as User;
    }
    return null;
};

export const updateUser = async (user: User): Promise<boolean> => {
    const apiRes = await userApi.put('',user);
    return apiRes.status === 200;
};