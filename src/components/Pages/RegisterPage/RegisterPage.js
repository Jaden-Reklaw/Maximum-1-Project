import React, { Component } from 'react';
import {connect} from 'react-redux';

// register page allows user to register
class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  // allow user to rigster account and send to database
  registerUser = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  // handle register data input
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="body">
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <h1>Create New Account</h1>
        <div className="buffer-space"></div>
        <form onSubmit={this.registerUser}>
          <h6>Account Details</h6>
          <div>
              <input
                className="login-register"
                placeholder="Username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </div>
          <div>
              <input
                className="login-register"
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </div>
          <div>
              <input
                className="login-register"
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
          </div>
          <div>
            <button
              className="register"
              type="submit"
              name="submit"
              value="Register">
              Sign Up
            </button>
          </div>
        </form>
        <center>
          <div>
            <span>Already have an account? </span>
            <button
              type="button"
              className="link-button"
              onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
            >
              Log in
            </button>
          </div>
          <div>
            <span>By signing up you agree to Maximum 1's </span>
            <a className="aTag" href="/#/termsOfService">Terms of Service</a>
          </div>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

