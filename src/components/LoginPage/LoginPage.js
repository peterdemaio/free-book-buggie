import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginMiniChart from '../LoginMiniChart/LoginMiniChart';
import LoginPageNav from './LoginPageNav'
//material UI imports
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab'
//importing components for animated countup
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';



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
    
    return (
      // <ThemeProvider theme={theme}></ThemeProvider>
      <>
        <LoginPageNav/>

        <div className="counter-div">
          <h1 className="counter-style"
          // font-size= "200%"
          >
            <CountUp
              start={0}
              end={18164}
              duration={1.5}
              separator=","
              decimals={0}
              decimal=","
              prefix="Books distributed: "
              suffix=" "
              onEnd={() => console.log('Ended! 👏')}
              onStart={() => console.log('Started! 💨')}
            // ref={CountUp => { this.myCountUp = CountUp; }}
            >
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
              {/* removing button in favor of page load  */}
              {/* {({ countUpRef, start }) => (
              <div>
                <span ref={countUpRef} />
                <button onClick={start}>Start</button>
              </div>
            )} */}
            </CountUp>
            <br />
            <CountUp
              start={0}
              end={12957}
              duration={1.75}
              separator=","
              decimals={0}
              decimal=","
              prefix="Children impacted: "
              suffix=" "
              onEnd={() => console.log('Ended! 👏')}
              onStart={() => console.log('Started! 💨')}
            // ref={CountUp => { this.myCountUp = CountUp; }}
            >
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
              {/* removing button in favor of page load */}
              {/* {({ countUpRef, start }) => (
              <div>
                <span ref={countUpRef} />
                <button onClick={start}>Start</button>
              </div>
            )} */}
            </CountUp>
          </h1>
        </div>

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
            {/* <h4 className="login-label">User Login</h4> */}
            {/* <br></br> */}

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
          
          {/* Volunteer Registration moved to home page */}
          {/* <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Volunteer Registration
          </button>
        </center> */}
        
        </div>
        

      </>

    );
  }
}



// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
