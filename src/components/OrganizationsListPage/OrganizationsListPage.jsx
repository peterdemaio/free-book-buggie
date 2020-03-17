import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import OrganizationsListItem from '../OrganizationsListItem/OrganizationsListItem'
import { withStyles, Grid } from '@material-ui/core';
import axios from 'axios'


const styles = {
    searchBar: {
        paddingTop: '50px',
        textSize: '36px'
    },
    input: {
        justify: 'center',
        padding: '10px'
    },
    list: {
        paddingLeft: '25px',
        paddingRight: '25px'
    }
}

class OrganizationsListPage extends React.Component {
    state = {
        searchQuery: "",
        organizations: [],
    }

     async componentDidMount() {
         this.props.dispatch({
             type: 'GET_ORGANIZATIONS'
         })
         this.props.dispatch({ 
            type: 'FETCH_COUNTIES'
        })
    }

    onInputChange = (event) => {
        this.setState({ searchQuery: event.target.value.toLowerCase()})
    }

    render() {
        let searchQuery = this.state.searchQuery
        const filteredList = this.props.reduxStore.organizations.filter(
            organization => organization.org_name.toLowerCase().includes(searchQuery) ||
                     organization.city.toLowerCase().includes(searchQuery) ||
                     organization.county_name.toLowerCase().includes(searchQuery) 
        )
        return (
            <div>
                <Grid container
                    justify="center"
                    alignItems="center"
                    className={this.props.classes.searchBar}>
                    <span>Search for an organization by name, city or county: </span>
                    <Input
                        className={this.props.classes.input}
                        placeholder="search here "
                        onChange={this.onInputChange}
                        value={this.state.searchQuery}>
                    </Input>
                </Grid>
                <Grid container
                    className={this.props.classes.list}
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                >
                    {filteredList.map(org =>
                        <OrganizationsListItem key={org.id} org={org} />
                    )}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

const styledOrganizationsListPage = withStyles(styles)(OrganizationsListPage)

export default connect(mapStateToProps)(styledOrganizationsListPage)