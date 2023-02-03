import axios from 'axios';
import config from  './config.json';

export const auth = axios.create({
    baseURL: config.api_base_url + config.auth_route,
});

export const user = axios.create({
    baseURL: config.api_base_url + config.user_route,
});

export const social = axios.create({
    baseURL: config.api_base_url + config.social_route,
});