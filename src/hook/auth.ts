import {authApi} from "./neighbookApi";

export const login = async (email: string, password: string): Promise<string> => {
    const apiRes = await authApi.post("/login", {email, password});
    if(apiRes.status === 200){
        return apiRes.data as string;
    }
    throw Error('login error');
};