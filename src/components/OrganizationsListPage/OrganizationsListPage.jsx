import React from 'react';
import { connect } from 'react-redux';
import OrganizationsListItem from '../OrganizationsListItem/OrganizationsListItem'

class OrganizationsListPage extends React.Component {

    state = {
        queryText: ''
    }
    componentDidMount() {
        console.log('organizations page ready')
        this.props.dispatch({
            type: 'GET_ORGANIZATIONS'
        })
    }


    render() {
        return (
            <div>
                {/* <input placeholder="search for organization" value={this.state.queryText} onChange={(event) => this.handleSearch(event)}></input> */}
                <ul className="organizationsList">
                    {this.props.reduxStore.organizations.map(org =>
                        <OrganizationsListItem key={org.id} org={org} />
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(OrganizationsListPage)