import React from 'react';
import { connect } from 'react-redux';

class OrganizationsListPageItem extends React.Component {
    render() {
        return(
            <h1>{this.props.org.name}</h1>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})


export default connect(mapStateToProps)(OrganizationsListPageItem)