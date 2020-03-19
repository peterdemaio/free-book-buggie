import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import InfoPage from '../InfoPage/InfoPage';
import DataReporting from '../DataReporting/DataReporting';
import DistributeBooks from '../DistributeBooks/DistributeBooks';
import NewOrganization from '../NewOrganization/NewOrganization';
import OrganizationsListPage from '../OrganizationsListPage/OrganizationsListPage';
import ContactsListPage from '../ContactsList/ContactsListPage';
import NewEvent from '../NewEvent/NewEvent';


import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_USER'
    })
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Nav /> */}

          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={HomePage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/contactsListPage"
              component={ContactsListPage}
            />
            <ProtectedRoute
              exact
              path="/organizationsListPage"
              component={OrganizationsListPage}
            />
            <ProtectedRoute
              exact
              path="/distributeBooks"
              component={DistributeBooks}
            />
            <ProtectedRoute
              exact
              path="/Event"
              component={NewEvent}
            />
            <ProtectedRoute
              exact
              path="/newOrganization"
              component={NewOrganization}
            />
            <ProtectedRoute
              exact
              path="/organizationsListPage"
              component={OrganizationsListPage}
            />
            <DataReporting
              exact
              path="/dataReporting"
              component={DataReporting}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    )
  }
}

export default connect()(App);
