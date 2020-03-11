import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import OrganizationsListItem from '../OrganizationsListItem/OrganizationsListItem'
import {withStyles, Grid } from '@material-ui/core';

const styles = {
    input : {
        justify: 'center'
    },
    list : {
        paddingLeft: '25px',
        paddingRight: '25px'
        // margin: 'px'
    }
}

class OrganizationsListPage extends React.Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'UPDATE_ORGANIZATIONS',
            payload: this.props.reduxStore.organizations
        })
    }

    onInputChange = (event) => {
        console.log(event.target.value)
        let newlyDisplayed = this.props.reduxStore.organizations.filter( 
            organization => organization.name.toLowerCase().includes(event.target.value.toLowerCase()) || 
            organization.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
            organization.county.toLowerCase().includes(event.target.value.toLowerCase())
            );

        this.props.dispatch({
            type: 'UPDATE_ORGANIZATIONS',
            payload: newlyDisplayed
        })
    }

    render() {
        return (
            <>
                <div>
                    <span>Search for an organization by name, city or county: </span>

                    <Input 
                        className={this.props.classes.input}
                        placeholder="search here "
                        onChange={this.onInputChange}>
                    </Input>
                </div>
                <div>
                    <Grid container 
                    className={this.props.classes.list}
                    direction="column"
                    justify="space-evenly"
                    alignItems="left"
                    >
                        {this.props.reduxStore.updateOrganizations.map(org =>

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

const styledOrganizationsListPage = withStyles(styles)(OrganizationsListPage)

export default connect(mapStateToProps)(styledOrganizationsListPage)