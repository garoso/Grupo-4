import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function SignUp(){

  const roleOptions = [
      { value: 0, label: 'Sin asignar' },
      { value: 1, label: 'Vendedor' },
      { value: 2, label: 'Administrador' }
  ];

  const [users, setusers] = useState([]);

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

  const getInitialState = () => {
    const value = "correo";
    return value;
  };
  
  const [usuario, setUsuario] = useState(getInitialState);
  const [role, setRole] = useState(roleOptions[0]);

  const selectRole = (role) => {
    setRole(role);
  } 

  const selectUser = (e) => {    
    const user = JSON.parse(e.target.value);    
    setRole(roleOptions[user.role]);
    setUsuario(user);
  };

  return(
    <div className="SignUp">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3 shadow mt-5 p-4 rounded">
            <form class="row g-3" action="http://localhost:5000/api/editClient" method="post"> 
              <div class="col-12 mt-2">
                <label for="inputUsers" class="form-label">Usuarios</label>                
                <select class="form-select" name="emailSelector" onChange={selectUser}> 
                  <option value={null}></option>                 
                  {
                    users.map((user) => (
                      <option value={JSON.stringify(user)}>{user.email}</option>
                    ))                    
                  }
                </select>
              </div>
              <div class="col-md-6 mt-4">
                <label for="inputName" class="form-label">Nombres</label>
                <input type="name" class="form-control" name="name"  id="inputName" value={usuario.firstName} required="true"/>
              </div>
              <div class="col-md-6 mt-4">
                <label for="inputLastName" class="form-label">Apellidos</label>
                <input type="name" class="form-control" name="lastname" id="inputLastname" value={usuario.lastName} required="true"/>
              </div>
              <div class="col-12 mt-4">
                <label for="inputEmail4" class="form-label">E-mail</label>                
                <input type="email" class="form-control" name="email" id="inputEmail" value={usuario.email} required="true"/>
              </div>
              <div class="col-md-6 mt-4">
                <label for="inputPhone" class="form-label">Teléfono</label>
                <input type="phone" class="form-control" id="inputAddress2" name="phoneNumber" placeholder="Número de teléfono"/>
              </div>
              <div class="col-md-6 mt-4">
                <label for="inputRol" class="form-label">Rol</label>
                <Select class="form-select" id="inputRol" name="role" options={roleOptions} value={role} onChange={selectRole} />                
              </div>
              <div class="col-12 mt-4">
                <button class="btn btn-dark btn-block" id="post-btn" type="submit">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
