import type {AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';
import axios from 'axios';
import {config} from "../config/api_config";

export const authApi = axios.create({
    baseURL: config.api_base_url + config.auth_route
});

class authenticatedApi {
    private instances: Record<string, AxiosInstance>;
    private token = "";

    public constructor() {
        this.instances = {};
    }

    private readonly _handleRequest = (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        config.headers.authorization = "Bearer " + this.token;
        return config;
    };

    public setToken(token: string){
        this.token = token;
    }

    private createInstance(route: string){
        const instance = axios.create({
            baseURL: config.api_base_url + (route === "default" ? "" : route)
        });
        instance.interceptors.request.use(this._handleRequest);
        this.instances[route] = instance;
        return instance;
    }

    public getInstance(route: string = "default"){
        if(Object.prototype.hasOwnProperty.call(this.instances, route)){
            return this.instances[route];
        }
        return this.createInstance(route);
    }
}

export const neighbookApi = new authenticatedApi();
export const baseApi = neighbookApi.getInstance();
export const userApi = neighbookApi.getInstance(config.user_route);
export const fileApi = neighbookApi.getInstance(config.file_route);
export const socialApi = neighbookApi.getInstance(config.social_route);
