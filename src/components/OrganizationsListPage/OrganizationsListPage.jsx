import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import OrganizationsListItem from '../OrganizationsListItem/OrganizationsListItem'
import OrganizationListPageNav from '../OrganizationsListPage/OrganizationListPageNav'
import { withStyles, Grid } from '@material-ui/core'
import BackgroundImage from './HeaderPurpleLight.png'



const styles = {
    background: {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        backgroundPosition: '100% 100%',
        paddingLeft: '0',
        paddingRight: '0',
        width: '100%'
    },
    searchBar: {
        paddingTop: '50px',
        textSize: '36px',
        fontFamily: 'Museo Slab',
        opacity: '1'

    },
    input: {
        justify: 'center',
        padding: '10px',
        opacity: '1'
    },
    list: {
        paddingLeft: '0px',
        paddingRight: '0px',
        opacity: '1'

    }
}

class OrganizationsListPage extends React.Component {
    state = {
        searchQuery: "",
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
        this.setState({ searchQuery: event.target.value.toLowerCase() })
    }

    render() {
        let searchQuery = this.state.searchQuery
        const filteredList = this.props.reduxStore.organizations.filter(
            organization => organization.org_name.toLowerCase().includes(searchQuery) ||
                organization.city.toLowerCase().includes(searchQuery) ||
                organization.county_name.toLowerCase().includes(searchQuery)
        )

        let displayList

        if (filteredList.length === 0) {
            displayList = ('No results')
        } else {
            displayList = (
                filteredList.map(org =>
                    <OrganizationsListItem key={org.id} org={org} />
                )
            )
        }
        return (
            <div>
                <OrganizationListPageNav />
                <div className={this.props.classes.background}>
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
                    {displayList}
                </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

const styledOrganizationsListPage = withStyles(styles)(OrganizationsListPage)

export default connect(mapStateToProps)(styledOrganizationsListPage)