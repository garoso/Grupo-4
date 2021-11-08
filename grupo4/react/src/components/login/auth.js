import cookie from 'react-cookies';
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '819657394751-viq5524nlnaulgi12eh0t2jgsvd8jofo.apps.googleusercontent.com';

class Auth {
    
  constructor() {
    this.authenticated = false;
  }

  login(updateHistory) {
    const client = new OAuth2Client(CLIENT_ID);
    const token = cookie.load('token');

    const verify = async (token) => {

        if (token === undefined || token === '') {
            this.authenticated = false;
        } else {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                console.log('UserID: ', userid);
                this.authenticated = true;
                updateHistory();
                return;
            } catch (error) {
                console.log('error', error);
            }            
        }
        console.log(this.authenticated);
    }
    
    verify(token);    
  }

  logout(updateHistory) {
    this.authenticated = false;
    updateHistory();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();