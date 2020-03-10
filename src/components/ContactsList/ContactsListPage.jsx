import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import ContactsListItem from '../ContactsListItem/ContactsListItem'
import {withStyles, Grid } from '@material-ui/core';

const styles = {
    input : {
        justify: 'center'
    },
    list : {
        paddingLeft: '25px',
        paddingRight: '25px'
    }
}
class ContactsListPage extends React.Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'UPDATE_CONTACTS',
            payload: this.props.reduxStore.contacts
        })
    }

    onInputChange = (event) => {
        console.log(event.target.value)
        let newlyDisplayed = this.props.reduxStore.contacts.filter( 
            contact => contact.contact_name.toLowerCase().includes(event.target.value.toLowerCase()) || 
            contact.name.toLowerCase().includes(event.target.value.toLowerCase())
            );

        this.props.dispatch({
            type: 'UPDATE_CONTACTS',
            payload: newlyDisplayed
        })
    }

    render() {
        return (
            <>
                <div>
                    <span>Search for an contact by name or organization: </span>
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
                    alignItems="left">
                        {this.props.reduxStore.updateContacts.map(contact =>
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