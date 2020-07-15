import React from 'react';
import {FormGroup, Input, Label, Button} from 'reactstrap';
import auth from '../../../helpers/auth';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  loginEvent = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    auth.loginUser(email, password)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((error) => {
        console.error('there was an error when logging in');
      });
  }

  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ email: tempUser.email });
  };

  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ password: tempUser.password });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="Login">
          <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <FormGroup onSubmit={this.loginEvent}>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email"                   handleChange={this.emailChange} value={email} />
                    <Input type="password" name="password" id="examplePassword" placeholder="password"     handleChange={this.passwordChange} value={password} />
                <div className='buttons'>
                    <Button type='submit'> Sign In </Button>
                    <Button type='button' onClick={auth.loginWithGoogle} isGoogleSignIn> Google Sign In </Button>
                </div>
                </FormGroup>
            </div>
      </div>
    );
  }
}

export default Login;