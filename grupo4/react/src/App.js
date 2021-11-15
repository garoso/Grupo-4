import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import { rutas} from './path';
import ProtectedRoute from './components/login/routes/ProtectedRoute';
import PublicRoute from './components/login/routes/PublicRoute';
import Login from './components/login/Login';
import SignUp from './components/admin/createUser.js';
import Producto from './components/product/Producto';
import RegistrarProducto from './components/product/RegistrarProducto';
import ModificarProducto from './components/product/ModificarProducto';
import Venta from './components/ventas/Venta';
import RegistarVenta from './components/ventas/RegistarVenta';
import Pendiente from './components/views/pendiente';
import Unauthorized from './components/views/unauthorized';
import ModificarVenta from './components/ventas/ModificarVenta';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute exact path={rutas.LOGIN} component={Login} />
          <PublicRoute exact path={rutas.PENDIENTE} component={Pendiente} />
          <PublicRoute exact path={rutas.UNAUTHORIZED} component={Unauthorized} />
          <ProtectedRoute exact path={rutas.ADMIN} component={SignUp} />
          <ProtectedRoute exact path={rutas.VENDEDOR} component={Venta} />
          <ProtectedRoute exact path={rutas.REG_VENTA} component={RegistarVenta} />
          <ProtectedRoute exact path={rutas.MOD_VENTA} component={ModificarVenta} />
          <ProtectedRoute exact path={rutas.PRODUCTOS} component={Producto} />
          <ProtectedRoute exact path={rutas.REG_PRODUCTO} component={RegistrarProducto} />
          <ProtectedRoute exact path={rutas.MOD_PRODUCTO} component={ModificarProducto} />
          <PublicRoute path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
