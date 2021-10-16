import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '819657394751-viq5524nlnaulgi12eh0t2jgsvd8jofo.apps.googleusercontent.com';

const ProtectedRoute = ({ ...props }) => {
    console.log("HOLAAAAAA***********************************+")
    const Component = props.component;
    console.log('Component', Component);
    const client = new OAuth2Client(CLIENT_ID);
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        verify(cookie.load('token'));
    }, [auth]);

    const verify = async (token) => {

        if (cookie.load('token') === undefined || cookie.load('token') === '') {
            console.log('undefined');
            setAuth(false);
        } else {
            console.log('El token existe: ', typeof cookie.load('token'));

            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                console.log('UserID: ', userid);
                setAuth(true);
            } catch (error) {
                console.log('error', error);
            }            
        }
    }

    return (
        <div>
            {console.log('auth', auth)}
            {auth ?
                <Component />
                : auth === false ?
                    <Redirect to={{ pathname: '/' }} /> :
                    <div><h1>Cargando...</h1></div>
            }
        </div>
    );
}

export default ProtectedRoute;