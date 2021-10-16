import React,{ useState } from  'react'
import { useHistory } from 'react-router'

const Login = () =>{

  const history = useHistory();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [dbUsers] = useState([
      {email:'admin@admin.com', password:'admin'},
      {email:'mesero@mesero.com', password:'mesero'},
      {email:'domiciliario@domiciliario.com', password:'domiciliario'},
    ]
  )

  const [error, setError] = useState('')

  const userChange = (e) =>{
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const sendForm = () =>{
    dbUsers.forEach(function(reg) {
      if (reg.email === user.email && reg.password === user.password){
        history.push('/home')
      }
    })
    setError('Usuario incorrecto');
  }

  return (
    <div className='col-sm-4 offset-sm-4 shadow mt-5 p-4 rounded'>
      <form>
        <div className='form-group'>
          <label for="exampleInputEmail1" class="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={userChange}
          />
        </div>
        <div className='form-group mt-3'>
          <label for="exampleInputPassword" class="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={userChange}
          />
        </div>
        <button onClick={sendForm} type="button" className="btn btn-dark btn-block mt-3">Ingresar</button>
        {
          error !== '' &&
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        }
      </form>
    </div>
  );

}
export default Login;
