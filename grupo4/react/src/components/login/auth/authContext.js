import { createContext, useState, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '819657394751-viq5524nlnaulgi12eh0t2jgsvd8jofo.apps.googleusercontent.com';
const LOGIN_ADMIN = 'LOGIN_ADMIN';
const LOGIN_VENDEDOR = 'LOGIN_VENDEDOR';

export const AuthContext = createContext();
export default function AuthContextProvider({children}) {    

    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(window.localStorage.getItem(LOGIN_ADMIN));
    const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem(LOGIN_VENDEDOR));

    const login = useCallback(() => {
        const client = new OAuth2Client(CLIENT_ID);
        const token = cookie.load('token');

        const verify = async (token) => {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                console.log('UserID: ', userid);
                window.localStorage.setItem(LOGIN_VENDEDOR, true);
                setIsAuthenticated(true);
                setIsAdminAuthenticated(true);
                return;
            } catch (error) {
                console.log('error', error);
            } 
        }
        
        verify(token);          
    }, []);

    const loginAdmin = useCallback(() => {
        
        const client = new OAuth2Client(CLIENT_ID);
        const token = cookie.load('token');

        const verify = async (token) => {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                console.log('UserID: ', userid);
                setIsAdminAuthenticated(true);
                setIsAuthenticated(false);
                window.localStorage.setItem(LOGIN_ADMIN, true);
                window.localStorage.removeItem(LOGIN_VENDEDOR, true);
                return;
            } catch (error) {
                console.log('error', error);
            } 
        }
        
        verify(token);  
    }, []);

    const logout = useCallback(() => {
        window.localStorage.removeItem(LOGIN_ADMIN, true);
        window.localStorage.removeItem(LOGIN_VENDEDOR, true);
        setIsAuthenticated(false);
        setIsAdminAuthenticated(false);
    }, []);

    const value = useMemo(() => ({
        isAuthenticated,
        isAdminAuthenticated,
        login,
        loginAdmin,
        logout
    }), [isAuthenticated, isAdminAuthenticated, login, loginAdmin, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
};