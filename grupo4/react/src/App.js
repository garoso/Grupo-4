import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/login/Login';
import ProtectedRoute from './components/login/ProtectedRoute';
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
          <ProtectedRoute exact path='/admin' component={SignUp} />
          <ProtectedRoute exact path='/vendedor' component={Pendiente} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
