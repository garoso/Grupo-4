import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import { rutas} from './path';
import ProtectedRoute from './components/login/routes/ProtectedRoute';
import PublicRoute from './components/login/PublicRoute';
import Login from './components/login/Login';
import SignUp from './components/admin/createUser.js';
import Pendiente from './components/views/pendiente';
import CreatePoduct from './components/product/createProduct';
import Unauthorized from './components/views/unauthorized';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute exact path={rutas.LOGIN} component={Login} />
          <PublicRoute exact path={rutas.PENDIENTE} component={Pendiente} />
          <PublicRoute exact path={rutas.UNAUTHORIZED} component={Unauthorized} />
          <ProtectedRoute exact path={rutas.ADMIN} component={SignUp} />
          <ProtectedRoute exact path={rutas.VENDEDOR} component={CreatePoduct} />
          <ProtectedRoute exact path={rutas.REG_VENTA} component={CreatePoduct} />
          <ProtectedRoute exact path={rutas.PRODUCTOS} component={CreatePoduct} />
          <ProtectedRoute exact path={rutas.REG_PRODUCTO} component={CreatePoduct} />
          <PublicRoute path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
