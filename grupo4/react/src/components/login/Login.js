import React, { useState } from 'react';
import { useHistory } from 'react-router';
import GoogleLogin from 'react-google-login';
import cookie from 'react-cookies';

const Login = () => {

    const history = useHistory();

    const responseGoogle = async (response) => {
        if (response.tokenId) {
            try {
                cookie.save('token', response.tokenId);
                const user = await fetch('http://localhost:5000/api/addUser', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: response.profileObj.name,
                        lastname: response.profileObj.familyName,
                        email: response.profileObj.email
                    })
                });

                const content = await user.json();

                if (content.role === 0) {
                    console.log("Administrador conectado.");
                    history.push('/admin');
                    return;
                } else if (content.role === 1){
                    console.log("Empleado conectado.");
                    history.push('/empleado');
                    return;
                } else if (content.role === 2){
                    console.log("Domiciliario conectado.");
                    history.push('/domiciliario');
                } 

                console.log("Asignación pendiente.");
                history.push('/pendiente');

            } catch (error) {
                console.log('error', error);
            }
        }
    };

    return (
        <div className="loginComponent">
            <div className="loginBox">
                <GoogleLogin
                    clientId="819657394751-viq5524nlnaulgi12eh0t2jgsvd8jofo.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    );
}

export default Login;
