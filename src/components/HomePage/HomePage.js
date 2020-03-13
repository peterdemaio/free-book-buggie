import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

//importing components for animated countup
// import { render } from 'react-dom';
import CountUp, { startAnimation } from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {

  render() {

    return (
      <>
        <h1 id="welcome">
          Welcome, {this.props.user.username}!
    </h1>
        <p>Your ID is: {this.props.user.id}</p>
        <button onClick={() => this.props.history.push('/collectBooks')}>Collect Books</button>
        <button onClick={() => this.props.history.push('/distributeBooks')}>Distribute Books</button>
        <button onClick={() => this.props.history.push('/dataReporting')}>Data Reporting</button>
        <br />
        <button onClick={() => this.props.history.push('/organizationsListPage')}>Organization List</button>
        <LogOutButton className="log-in" />
        <h1>
          <CountUp
            start={0}
            end={18164}
            duration={3}
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
          <br/>
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
     </> 
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
