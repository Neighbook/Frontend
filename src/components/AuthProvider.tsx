import React, {useEffect} from "react";
import {login} from "../hook/auth";
import {useLocation, useNavigate} from "react-router";
import { decodeToken, isExpired } from "react-jwt";
import { useCookies } from "react-cookie";
import {neighbookApi} from "../hook/neighbookApi";
import type { User} from "../hook/user";
import {getUsers} from "../hook/user";
import {getFollows} from "../hook/follow";

interface Props{
    children: JSX.Element | string
}

interface Token{
    _user_id: string
    _user_firstname: string
    _user_lastname: string
    _user_name: string
    exp: number
}

interface CurrentUser{
    id: string
    firstname: string
    lastname: string
    username: string
}

interface Location{
    state: {
        from: {
            pathname: string | undefined
        }
    }
}

interface AuthContextType{
    currentUser: CurrentUser | null
    usersBase: Array<User> | null
    follows: Array<User> | null
    getToken: Function
    onLogin?: (email: string, password: string) => Promise<void>;
    onRegister: Function;
    onLogout: Function
    isLoggedIn: ()=>boolean
    reloadFollows: Function
}

const AuthContext = React.createContext<AuthContextType>({
    currentUser: null,
    usersBase: null,
    follows: null,
    getToken: ()=>null,
    onLogout: ()=>null,
    onRegister: ()=>null,
    isLoggedIn: ()=>false,
    reloadFollows: ()=>false
});

export const useAuth = () => {
    return React.useContext(AuthContext);
};

const getUserFromToken = (token: string): CurrentUser => {
    const decodedToken = decodeToken(token) as Token;
    return {
        id: decodedToken._user_id,
        firstname: decodedToken._user_firstname,
        lastname: decodedToken._user_lastname,
        username: decodedToken._user_name,
    };
};

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken, removeToken] = useCookies(['token']);
    const [currentUser, setCurrentUser] = React.useState<CurrentUser | null>(null);
    const [usersBase, setUsersBase] = React.useState<Array<User> | null>(null);
    const [follows, setFollows] = React.useState<Array<User> | null>(null);
    const location = useLocation() as Location;
    const navigate = useNavigate();

    useEffect(()=>{
        const controller = new AbortController();
        if(token.token !== null && token.token !== undefined){
            neighbookApi.setToken(token.token);
            if(currentUser === null) {
                setCurrentUser(getUserFromToken(token.token));
            }
            if(usersBase === null){
                getUsers(controller.signal).then(res=>{ setUsersBase(res); }).catch(()=>null);
            }
            if(follows === null){
                getFollows(controller.signal).then(res=>{ setFollows(res); }).catch(()=>null);
            }
        }
        return () => {
            controller.abort();
        };
    }, [token, currentUser, usersBase, follows]);

    const getToken = (): string => {
        if(token.token === null){
            return "";
        }
        return token.token as string;
    };

    const handleLogin = async (email: string, password: string): Promise<void> => {
        const token = await login(email, password);
        const tokenData = decodeToken(token) as Token;
        const exp = new Date(0);
        exp.setUTCSeconds(tokenData.exp);
        setToken('token', token, { path: '/' , expires: exp});
        const origin = location.state.from.pathname ?? '/';
        navigate(origin);
    };

    const handleRegister = (token: string): void => {
        setToken('token', token, { path: '/' });
        navigate('/');
    };

    const handleLogout = (): void => {
        removeToken('token');
    };

    const isLoggedIn = (): boolean => {
        if(token.token === null){
            return false;
        }
        return !isExpired(token.token);
    };

    const reloadFollows = (): void => {
        setFollows(null);
    };

    const value = {
        currentUser,
        usersBase,
        follows,
        getToken,
        onLogin: handleLogin,
        onRegister: handleRegister,
        onLogout: handleLogout,
        isLoggedIn,
        reloadFollows
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};