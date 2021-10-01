import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './components/login/Login'
import SignUp from './components/signUp/SignUp'
import Home from './components/home/Home'


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signUp' component={SignUp} />
          <Route exact path='/home' component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
