import useAuthContext from "../login/auth/hooks/useAuthContext";
import { rutas } from "../../path";

function Navbar(){

  const {isAuthenticated, isAdminAuthenticated, logout} = useAuthContext();

  let tabs = null;
  let logoutButton = null;

  const productosMenu = <> 
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href={rutas.PRODUCTOS} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
              Productos
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href={rutas.PRODUCTOS}>Productos</a>
                <a class="dropdown-item" href={rutas.REG_PRODUCTO}>Registrar productos</a>
                <a class="dropdown-item" href={rutas.MOD_PRODUCTO}>Modificar productos</a>
              </div>
            </li>  
  </>

  const ventasMenu = <> 
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href={rutas.VENDEDOR} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
              Ventas
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href={rutas.VENDEDOR}>Ventas</a>
                <a class="dropdown-item" href={rutas.REG_VENTA}>Registrar ventas</a>
                <a class="dropdown-item" href={rutas.MOD_VENTA}>Modificar ventas</a>
              </div>
            </li>  
  </>

  if (isAdminAuthenticated && !isAuthenticated) {
    tabs = <>
            <a class="nav-item active nav-link" href="/admin">Usuarios</a>
            { productosMenu }
            { ventasMenu }
          </>
    logoutButton = <button class="btn btn-outline-danger my-2 my-sm-0" onClick={logout}>Cerrar sesión</button>
  } else if (isAuthenticated) {
    tabs = <>
            { ventasMenu }
          </>
    logoutButton = <button class="btn btn-outline-danger my-2 my-sm-0" onClick={logout}>Cerrar sesión</button>
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <a class="navbar-brand" href={rutas.LOGIN}>
        <img  width="30" height="30" class="d-inline-block align-top" alt="" src="https://static.wixstatic.com/media/2cd43b_fd0aba46da664bba9992400e48d51338~mv2_d_3543_4502_s_4_2.png/v1/fill/w_320,h_406,q_90/2cd43b_fd0aba46da664bba9992400e48d51338~mv2_d_3543_4502_s_4_2.png"></img>
        <span class="navbar-brand mb-0 h1">PUB Data System</span>
      </a>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <div class="navbar-nav">
          <a class="nav-item active nav-link" href={rutas.LOGIN}>Principal</a>
          { tabs } 
        </div>        
      </div>
      { logoutButton }
    </nav>
  );
}

export default Navbar;