import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import ContactsListItem from '../ContactsListItem/ContactsListItem'
import { withStyles, Grid } from '@material-ui/core';
import axios from 'axios'
import ContactListNav from './ContactListNav';

const styles = {
    searchBar: {
        paddingTop: '50px',
        // maxWidth: '600px'
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
class ContactsListPage extends React.Component {

    state = {
        contacts: [],
        filteredContacts: []
    }
    async componentDidMount() {
        axios.get('/api/contacts')
        .then((response) => {
            this.setState({
            contacts: response.data,
            filteredContacts: response.data
        })
    })
    }

    onInputChange = (event) => {
        let searchQuery = event.target.value.toLowerCase();
        this.setState({
            filteredContacts: this.state.contacts.filter(
                contact => contact.contact_name.toLowerCase().includes(searchQuery)
            )
        })
    }

    render() {
        return (
            <>
            <ContactListNav/>
            <div>
                <Grid container
                    justify="center"
                    alignItems="center"
                    className={this.props.classes.searchBar}>
                    <span>Search for an contact by name or organization: </span><br></br>
                    <Input
                        className={this.props.classes.input}
                        placeholder="search here "
                        onChange={this.onInputChange}>
                    </Input>
                </Grid>
                <Grid container
                    className={this.props.classes.list}
                    direction="column"
                    justify="space-evenly"
                    alignItems="center">
                    {this.state.filteredContacts.map(contact =>
                        <ContactsListItem key={contact.id} contact={contact} />
                    )}
                    <br/>
                    <br/>
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