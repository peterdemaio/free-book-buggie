import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrganizationListPage extends Component {
    render() {
        return (
            <>
                <h1>Organization List</h1>
                <button onClick={() => this.props.history.push('/home')}>Home</button>

            </>
        )
    }
}

export default OrganizationListPage;