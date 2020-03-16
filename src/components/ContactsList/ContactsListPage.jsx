import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import ContactsListItem from '../ContactsListItem/ContactsListItem'
import {withStyles, Grid } from '@material-ui/core';

const styles = {
    searchBar : {
        paddingTop: '50px',
        // maxWidth: '600px'
        textSize: '36px'
    },
    input : {
        justify: 'center',
        padding: '10px'
    },
    list : {
        paddingLeft: '25px',
        paddingRight: '25px'
    }
}
class ContactsListPage extends React.Component {

    state = {
        contacts: [],
        filteredContacts: []
    }
    componentDidMount() {
        fetch(this.props.dispatch({
            type: 'GET_CONTACTS'
          }))
        .then(this.setState({
            contacts: this.props.reduxStore.contacts,
            filteredContacts: this.props.reduxStore.contacts
        }))
    }

    onInputChange = (event) => {
        let searchQuery = event.target.value.toLowerCase();
        this.setState({
            filteredContacts: this.props.reduxStore.contacts.filter( 
                contact => contact.contact_name.toLowerCase().includes(searchQuery)
                )
        })
    }

    render() {
        return (
            <>
                <Grid container 
                justify="center"
                alignItems="center"
                className={this.props.classes.searchBar}
                >
                    <span className={this.props.classes.searchBar}>Search for an contact by name or organization: </span><br></br>
                    <Input 
                        className={this.props.classes.input}
                        placeholder="search here "
                        onChange={this.onInputChange}>
                    </Input>
                </Grid>
                <div>
                    <Grid container 
                    className={this.props.classes.list}
                    direction="column"
                    justify="space-evenly"
                    alignItems="center">
                        {this.state.filteredContacts.map(contact =>
                            <ContactsListItem key={contact.id} contact={contact} />
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

const styledContactsListPage = withStyles(styles)(ContactsListPage)

export default connect(mapStateToProps)(styledContactsListPage)