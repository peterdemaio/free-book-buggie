import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginMiniChart from '../LoginMiniChart/LoginMiniChart';
import LoginPageNav from './LoginPageNav'
//material UI imports
import { createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab'
import BookCountUp from '../BookCountUp/BookCountUp';




const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#14771B"
    }
  }
})

class LoginPage extends Component {
    state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    // console.log('in login function');

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        history: this.props.history, // making history available to login Saga
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {

    console.log(this.props.history)

    return (
      
      <>
        
        <LoginPageNav/>
        <BookCountUp/>
        <div>
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
          <h2 className="chart-title">Books Kept out of Landfills Monthly</h2>
          <LoginMiniChart />
          <div
            className="login-div"
            onSubmit={this.login}>
            
            <div className="username-div">
              <label htmlFor="username">
                Username:
              <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div className="password-div">
              <label htmlFor="password">
                Password:
              <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>
            <div >
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="Add"
                className="login-button"
                type="submit"
                name="submit"
                value="User Log In"
                onClick={this.login}
                theme={theme}
              >
                Log In
                </Fab>
            </div>
            
          </div>
          
          
        </div>
        <br/>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state, reduxStore) => ({
  errors: state.errors,
  reduxStore
});

export default connect(mapStateToProps)(LoginPage);
