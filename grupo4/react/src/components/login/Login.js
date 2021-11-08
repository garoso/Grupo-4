import React from 'react';
import { useHistory } from 'react-router';
import GoogleLogin from 'react-google-login';
import cookie from 'react-cookies';
import auth from "./auth";
import LoginIcon from '../../images/user.png';
import '../../App.css';

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
                if (content.role === 0){
                    console.log("Vendedor conectado.");
                    auth.login(() => {
                        history.push('/vendedor');
                    });                    
                    return;
                } else if (content.role === 1) {
                    console.log("Administrador conectado.");
                    auth.login(() => {
                        history.push('/admin');
                    });  
                    return;
                }

                console.log("Asignación pendiente.");
                history.push('/pendiente');

            } catch (error) {
                console.log('error', error);
            }
        }
    };

    return (
        <div class="modal-dialog text-center">
            <div class="col-sm-8 main-section">
                <div class="modal-content">
                    <div class="col-12 user-img">
                        <img src={LoginIcon} alt="icon" />
                    </div>
                    <div class="d-grid gap-2">
                        <div className="loginBox">
                            <h4 class="mg-l">Inicie sesión: </h4>
                            <GoogleLogin
                                clientId="819657394751-viq5524nlnaulgi12eh0t2jgsvd8jofo.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>                      
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default Login;
