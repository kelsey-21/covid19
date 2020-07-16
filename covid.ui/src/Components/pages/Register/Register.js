import React from 'react';

import auth from '../../../helpers/auth';

class Register extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      userTypeName: 'StandardUser',
    },
  };

  registerClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    auth
      .registerUser(user)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(error => {
        console.error('there was an error in registering', error);
      });
  };


  emailChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };
  firstNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.firstName = e.target.value;
    this.setState({ user: tempUser });
  };
  lastNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.lastName = e.target.value;
    this.setState({ user: tempUser });
  };

  render() {
    return (
      <div className="Login">
          <div className='sign-in'>
            <h2>Create an account</h2>
            <div className="Register">
              <div id="register-form">
                <h1 className="text-center">Register</h1>
                <form className="form-horizontal col-sm-6 col-sm-offset-3">
                <div className="form-group">
                    <div className="col-sm-8">
                      <input
                        type="firstName"
                        className="form-control"
                        id="inputfirstName"
                        placeholder="First Name"
                        value={this.state.user.firstName}
                        onChange={this.firstNameChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-8">
                      <input
                        type="lastName"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        value={this.state.user.lastName}
                        onChange={this.lastNameChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmailReg"
                        placeholder="Email"
                        value={this.state.user.email}
                        onChange={this.emailChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPasswordReg"
                        placeholder="Password"
                        value={this.state.user.password}
                        onChange={this.passwordChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-12 text-center">
                      {/* <Link to="/register">Need to Register?</Link> */}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-12">
                      <button
                        type="submit"
                        className="btn btn-default col-xs-12"
                        onClick={this.registerClickEvent}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            </div>
      </div>
    );
  }
}

export default Register;