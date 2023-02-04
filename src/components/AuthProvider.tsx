import React, {useEffect} from "react";
import {login} from "../hook/auth";
import {useLocation, useNavigate} from "react-router";
import { decodeToken, isExpired } from "react-jwt";
import { useCookies } from "react-cookie";
import {neighbookApi} from "../hook/neighbookApi";

interface Props{
    children: JSX.Element | string
}

interface Token{
    _user_id: string
    _user_firstname: string
    _user_lastname: string
    _user_name: string
}

interface User{
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
    currentUser: User | null
    getToken: Function
    onLogin?: (email: string, password: string) => Promise<void>;
    onLogout: Function
    isLoggedIn: ()=>boolean
}

const AuthContext = React.createContext<AuthContextType>({
    currentUser: null,
    getToken: ()=>null,
    onLogout: ()=>null,
    isLoggedIn: ()=>false
});

export const useAuth = () => {
    return React.useContext(AuthContext);
};

const getUserFromToken = (token: string): User => {
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
    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    const location = useLocation() as Location;
    const navigate = useNavigate();

    useEffect(()=>{
        if(token.token !== null && token.token !== undefined){
            neighbookApi.setToken(token.token);
            if(currentUser === null) {
                setCurrentUser(getUserFromToken(token.token));
            }
        }
    }, [token, currentUser]);

    const getToken = (): string => {
        if(token.token === null){
            return "";
        }
        return token.token as string;
    };

    const handleLogin = async (email: string, password: string): Promise<void> => {
        const token = await login(email, password);
        setToken('token', token, { path: '/' });
        const origin = location.state.from.pathname ?? '/';
        navigate(origin);
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

    const value = {
        currentUser,
        getToken,
        onLogin: handleLogin,
        onLogout: handleLogout,
        isLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};