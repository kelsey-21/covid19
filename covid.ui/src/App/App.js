import React from 'react';
// import firebase from 'firebase';
import FirebaseApp from '../helpers/connection';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Navbar from '../components/shared/Navbar/Navbar';
import Footer from '../components/shared/Footer/Footer';
import Map from '../components/pages/Map/Map';
import State from '../components/pages/State/State';
import Login from '../components/pages/Login/Login';
import Register from '../components/pages/Register/Register';
import AddPolicy from '../components/pages/AddPolicy/AddPolicy';

import './App.scss';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

FirebaseApp();

class App extends React.Component {
  state = {
    authed: false,
  }

  // componentDidMount() {
  //   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
  //     if (user && this.state.authed === false) {
  //       this.setState({ authed: true });
  //     } else if (user) {
  //       this.setState({ authed: false });
  //     }
  //   });
  // };

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <Navbar authed={authed}/>
          <Switch>
            <Route path="/" exact component={Map} authed={authed} />
            <Route path="/login" exact component={Login} authed={authed} />
            <Route path="/register" exact component={Register} authed={authed} />
            <Route path="/location/:locationId" exact component={State} authed={authed} />
            <PrivateRoute path="/{userId}/submitpolicy" exact component={AddPolicy} authed={authed} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;