import React, { useEffect, useState } from 'react'
import axios from 'axios';

function SignUp(){

  var [users, setusers] = useState([]);

  useEffect(() => {
      getUsersPendientes();
  }, []);


  const getUsersPendientes = async () => {
      try {
          const response = await axios.get('http://localhost:5000/api/pendientes');
          console.log(response.data.users);
          setusers(response.data.users);
      } catch (error) {
          console.log("Ha ocurrido un error");
      }
  }

  return(
    <div className="SignUp">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3 shadow mt-5 p-4 rounded">
            <form class="row g-3" action="http://localhost:5000/api/editClient" method="post"> 
              <div class="col-12 mt-2">
                <label for="inputUsers" class="form-label">Usuarios</label>                
                <select class="form-select">                  
                  {
                    users.map((user) => (
                      <option value={user.id} id={`optionUser${user.id}`}>{user.email}</option>
                    ))                    
                  }
                </select>
              </div>
              <div class="col-md-6 mt-4">
                <label for="inputName" class="form-label">Nombres</label>
                <input type="name" class="form-control" id="inputName"/>
              </div>
              <div class="col-md-6 mt-4">
                <label for="inputLastName" class="form-label">Apellidos</label>
                <input type="name" class="form-control" id="inputPassword4"/>
              </div>
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="inputEmail4"/>
              </div>
              <div class="col-md-6">
                <label for="inputRol" class="form-label">Rol</label>
                <select class="form-select" id="inputRol">
                  <option value="0">Administrador</option>
                  <option value="1">Empleado</option>
                  <option value="2">Domiciliario</option>
                </select>
              </div>
              <div class="col-12 mt-3">
                <label for="inputAddress" class="form-label">Dirección</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
              </div>
              <div class="col-md-6 mt-2">
                <label for="inputCity" class="form-label">Ciudad</label>
                <input type="text" class="form-control" id="inputCity"/>
              </div>
              <div class="col-md-6 mt-2">
                <label for="inputPhone" class="form-label">Teléfono</label>
                <input type="phone" class="form-control" id="inputAddress2" placeholder="Número de teléfono"/>
              </div>
              <div class="col-12 mt-4">
                <button type="submit" class="btn btn-dark btn-block">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
