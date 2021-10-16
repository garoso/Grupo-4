import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/login/Login';
import ProtectedRoute from './components/login/Login';
import SignUp from './components/signUp/SignUp.js';
import Home from './components/home/Home';
import Pendiente from './components/pendiente/pendiente';
import CreateUser from './components/createUser/createUser';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/pendiente' component={Pendiente} />
          <Route exact path='/admin' component={SignUp} />
          <ProtectedRoute exact path='/empleado' component={Pendiente} />
          <ProtectedRoute exact path='/domiciliario' component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
