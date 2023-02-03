import {user} from "./neighbookApi";

export const getUser = async (user_id: string): Promise<{}> => {
    const apiRes = await user.get(user_id);
    if(apiRes.status === 200){
        return apiRes.data as string;
    }
    throw Error("Login error");
};