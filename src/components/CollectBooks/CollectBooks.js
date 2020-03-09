import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationsListItem from '../OrganizationsListItem/OrganizationsListItem';


// Material UI imports
import {
    withStyles,
    Button,
    Grid
}
    from '@material-ui/core';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class CollectBooks extends Component {

    // let id = this.props.id
    // let index = id - 1
    // let organization = this.props.reduxStore.organization[index]

    componentDidMount() {
        console.log('organizations page ready')
        this.props.dispatch({
            type: 'GET_ORGANIZATIONS'
        })
    }

    render() {
        return (
            <>
                <h1>CollectBooks page</h1>
                {/* Search functionality for orgs, make clickable to display info */}
                {/* <div >
                    <input placeholder="Search for organization"
                        onChange={(event) => this.props.dispatch({
                            type: 'SEARCH_ORGANIZATIONS',
                            payload: event.target.value
                        })}>
                    </input>
                </div>
                <div>
                    <Grid container
                        // direction="column"
                        // justify="space-evenly"
                        // alignItems="center"
                        spacing={12}
                    >
                        {this.props.reduxStore.organizations.map(org =>
                            <OrganizationsListItem key={org.id} org={org} />
                        )} */}
                        <Grid item
                            direction="column"
                            justify="flex-end"
                            alignItems="flex-end"
                        >
                            <Button container
                                color="primary"
                                className={this.props.classes.button}
                                onClick={() => this.props.history.push('/newOrganization')}
                            >
                                New Organization
                            </Button>
                            <br />
                            <Button
                                color="primary"
                                className={this.props.classes.button}
                                onClick={() => this.props.history.push('/newEvent')}
                            >
                                New Event
                            </Button>
                            <br />
                            <Button
                                color="primary"
                                className={this.props.classes.button}
                                onClick={() => this.props.history.push('/newIndividual')}
                            >
                                New Individual
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <button onClick={() => this.props.history.push('/editOrganization')}>Sample Organization</button>
                <button onClick={() => this.props.history.push('/newOrganization')}>Add New Organization</button>
                <button onClick={() => this.props.history.push('/home')}>Home</button>

            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(CollectBooks));