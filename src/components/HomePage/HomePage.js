import React from 'react';
import { connect } from 'react-redux';
import HomePageNav from './HomePageNav'
import Footer from '../Footer/Footer'


const UserPage = (props) => (
  <>
    <HomePageNav />

    <div className="volunteer-button-div">
      
      <center >
        <button

          className="login-button"
          type="button"
          
          onClick={() => props.history.push('/registerPage')}
        >
          Volunteer Registration
          </button>
       
        <button

          className="login-button"
          type="button"
          
          onClick={() => props.history.push('/volunteerEvent')}
        >
          Mobile Recording
          </button>
      </center>
    </div>

    <div className="welcome-message-div">
      <h1 id="welcome" >
        Welcome, {props.user.username}!
    </h1>
     
    </div>
    <Footer />
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
