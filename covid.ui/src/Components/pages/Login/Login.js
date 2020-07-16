import React from 'react';
import auth from '../../../helpers/auth';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    auth
      .loginUser(user)
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

  render() {
    return (
      <div className="Login">
          <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <div className="Login">
              <div id="login-form">
                <h1 className="text-center">Login</h1>
                <form className="form-horizontal col-sm-6 col-sm-offset-3">
                  <div className="form-group">
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
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
                        id="inputPassword"
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
                        onClick={this.loginClickEvent}
                      >
                        Login
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

export default Login;