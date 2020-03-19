import React from 'react';
import { connect } from 'react-redux';
// import LogOutButton from '../LogOutButton/LogOutButton';
import HomePageNav from './HomePageNav'
import Footer from '../Footer/Footer'


// import {
//   Button
// }
//   from '@material-ui/core';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

const UserPage = (props) => (
  <>
    <HomePageNav />

  <div className="volunteer-button-div">
    {/* <h3>Register a new volunteer here: </h3> */}
  <center >
    <button
      
      className="login-button"
      type="button"
      onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
    >
      Volunteer Registration
          </button>
  </center>
  </div>

    <div className="welcome-message-div">
      <h1 id="welcome" >
        Welcome, {props.user.username}!
    </h1>
      {/* <p>Your ID is: {props.user.id}</p> */}
      {/* <Button onClick={() => props.history.push('/event')}>New Event</Button> */}
      {/* <Button onClick={() => props.history.push('/distributeBooks')}>Distribute Books</Button> */}
      {/* <Button onClick={() => props.history.push('/dataReporting')}>Data Reporting</Button> */}
      <br />
      {/* <Button onClick={() => props.history.push('/organizationsListPage')}>Organization List</Button> */}
      {/* <LogOutButton className="log-in" /> */}
    </div>
    <Footer/>
  </>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
