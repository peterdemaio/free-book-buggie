import React, { Component } from 'react';
import { connect } from 'react-redux';


//importing components for animated countup
// import { render } from 'react-dom';
import CountUp, { startAnimation } from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

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
      <>
        <h1>
          <CountUp
            start={0}
            end={18164}
            duration={2.5}
            separator=","
            decimals={0}
            decimal=","
            prefix="Total books received to date: "
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
            duration={3}
            separator=","
            decimals={0}
            decimal=","
            prefix="Children impacted to date: "
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
      
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
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
          <div>
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
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>
        </center>
      </div>
      </>

    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
