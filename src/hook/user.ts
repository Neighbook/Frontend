import {userApi} from "./neighbookApi";
import type {GenericAbortSignal} from "axios";

export interface User{
    nom?: string
    prenom?: string
}

export const getUser = async (user_id: string, signal: GenericAbortSignal): Promise<User> => {
    const apiRes = await userApi.get(user_id, {signal: signal});
    if(apiRes.status === 200){
        return apiRes.data as User;
    }
    throw Error("Login error");
};