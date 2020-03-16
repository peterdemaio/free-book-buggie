import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import OrganizationsListItem from '../OrganizationsListItem/OrganizationsListItem'
import { withStyles, Grid } from '@material-ui/core';

const styles = {
    input: {
        justify: 'center'
    },
    list: {
        paddingLeft: '25px',
        paddingRight: '25px'
        // margin: 'px'
    }
}

class OrganizationsListPage extends React.Component {

    state = {
        organizations: [],
        filteredOrganizations: []
    }

    componentDidMount() {
        fetch(this.props.dispatch({
            type: 'GET_ORGANIZATIONS'
        }))
        .then(this.setState({
            organizations: this.props.reduxStore.organizations,
            filteredOrganizations: this.props.reduxStore.organizations
        }))
    }

    onInputChange = (event) => {
        let searchQuery = event.target.value.toLowerCase()
        this.setState({
            filteredOrganizations: this.props.reduxStore.organizations.filter(
                organization => organization.org_name.toLowerCase().includes(searchQuery) ||
                    organization.city.toLowerCase().includes(searchQuery) ||
                    organization.county_name.toLowerCase().includes(searchQuery)
            )
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
                        {this.state.filteredOrganizations.map(org =>

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