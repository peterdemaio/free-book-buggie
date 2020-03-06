import React, { Component } from 'react';
import { connect } from 'react-redux';

class CollectBooks extends Component {



    render() {
        return (
            <>
                <h1>CollectBooks page</h1>
                <button onClick={() => this.props.history.push('/editOrganization')}>Sample Organization</button>
                <button onClick={() => this.props.history.push('/newOrganization')}>Add New Organization</button>
                <button onClick={() => this.props.history.push('/home')}>Home</button>
            </>
        )
    }
}

export default CollectBooks;