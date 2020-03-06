import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewOrganization extends Component {

    render() {
        return (
            <>
                <h1>Add New Organization</h1>
                <button onClick={() => this.props.history.push('/collectBooks')}>Save</button>
                <button onClick={() => this.props.history.push('/collectBooks')}>Cancel</button>

            </>
        )
    }
}

export default NewOrganization;