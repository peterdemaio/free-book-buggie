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
        paddingLeft: '250px',
        paddingRight: '250px'
        // margin: 'px'
    }
}

class OrganizationsListPage extends React.Component {


    state = {
        queryText: '',
        currentlyDisplayed: []
    }

    componentDidMount() {
        console.log('organizations page ready')
        this.setState({
            currentlyDisplayed: this.props.reduxStore.organizations
        })
    }

    onInputChange = (event) => {
        console.log(event.target.value)
        let newlyDisplayed = this.props.reduxStore.organizations.filter( 
            organization => organization.name.toLowerCase().includes(event.target.value.toLowerCase()));

        this.setState({
            queryText: event.target.value,
            currentlyDisplayed: newlyDisplayed
        })
    }

    render() {
        return (
            <>
                <div >
                    <Input 
                        className={this.props.classes.input}
                        placeholder="Search for organization"
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
                        {this.state.currentlyDisplayed.map(org =>
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