import {fileApi} from "./neighbookApi";

interface file_res{
    file_url: string;
}

export const uploadFile = async (file_name: string, file: File): Promise<string> => {
    const apiRes = await fileApi.post("upload/profilec/"+file_name, {file}, {headers: {
        'Content-Type': 'multipart/form-data'
    }});
    if(apiRes.status === 200){
        return (apiRes.data as file_res).file_url;
    }
    throw Error('error while uploading file');
};

