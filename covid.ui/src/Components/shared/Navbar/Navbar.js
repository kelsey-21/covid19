import React, { useState } from 'react';
import { Collapse, Nav, NavbarToggler, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'

import auth from '../../../helpers/auth';

import './Navbar.scss';

function NavbarComp() {
  const logMeOut = (e) => {
    e.preventDefault();
    auth.logoutUser();
  };

    // const { authed } = this.props;

  return (
    <div className="actual-nav">
      <Nav pills className="d-flex justify-content-center">
            <NavItem>
              <NavLink href="/">HOME</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#Key">KEY</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#Sources">SOURCES</NavLink>
            </NavItem>
            <NavItem>
            {/* {
                authed ?
                  <Link to="/" className="btn btn-outline" onClick={logMeOut}>Logout</Link>
                  : <Link to="/login" className="btn btn-outline">Login</Link>
              } */}
            </NavItem>
      </Nav>
    </div>
  );
}

export default NavbarComp