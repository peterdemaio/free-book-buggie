import React, { Component } from 'react';
import { connect } from 'react-redux';

class DistributeBooks extends Component {
    render() {
        return (
            <>
                <h1>DistributeBooks page</h1>
                <button onClick={this.props.history.push('/newOrganization')}>Add New Organization</button>
                <button onClick={this.props.history.push('/home')}>Add Books</button>
            </>
        )
    }
}

export default DistributeBooks