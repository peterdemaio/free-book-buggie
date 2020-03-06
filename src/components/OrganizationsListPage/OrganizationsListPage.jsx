import React from 'react';
import { connect } from 'react-redux';
import OrganizationsListItem from '../OrganizationsListItem/OrganizationsListItem'
import {withStyles, Grid } from '@material-ui/core';

const styles = {
    list : {

    }
}

class OrganizationsListPage extends React.Component {

    componentDidMount() {
        console.log('organizations page ready')
        this.props.dispatch({
            type: 'GET_ORGANIZATIONS'
        })
    }

    render() {
        return (
            <>
                <div >
                    <input placeholder="Search for organization"
                        onChange={(event) => this.props.dispatch({
                            type: 'SEARCH_ORGANIZATIONS',
                            payload: event.target.value
                        })}>
                    </input>
                </div>
                <div>
                    <Grid container 
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    >
                        {this.props.reduxStore.organizations.map(org =>
                            <OrganizationsListItem key={org.id} org={org} />
                        )}
                    </Grid>
                </div>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(OrganizationsListPage)