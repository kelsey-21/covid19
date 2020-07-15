import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom'

import auth from '../../../helpers/auth';

import './Navbar.scss';

class Navbar extends React.Component {
  logMeOut = (e) => {
    e.preventDefault();
    auth.logoutUser();
  };

  render() {
    const { authed } = this.props;

    return(
      <nav className="navbar navbar-expand-lg">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Key">Key</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Sources">Sources</a>
            </li>
            <li className="nav-item">
              {
                authed ?
                  <Link to="/" className="btn btn-outline" onClick={this.logMeOut}>Logout</Link>
                  : <Link to="/login" className="btn btn-outline">Login</Link>
              }
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar