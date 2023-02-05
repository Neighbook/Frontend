import {authApi} from "./neighbookApi";

export const login = async (email: string, password: string): Promise<string> => {
    const apiRes = await authApi.post("/login", {email, password});
    if(apiRes.status === 200){
        return apiRes.data as string;
    }
    throw Error('login error');
};

export const register = async (prenom: string,
    nom: string,
    sexe: string,
    nom_utilisateur: string,
    date_naissance: string,
    email: string,
    password: string,
    telephone: string,
    code_pays: string,
    photo: string): Promise<string> => {
    const apiRes = await authApi.post("/register", {
        prenom,
        nom,
        sexe,
        nom_utilisateur,
        date_naissance,
        email,
        password,
        telephone,
        code_pays,
        photo
    });
    if(apiRes.status === 200){
        return apiRes.data as string;
    }
    throw Error('register error');
};