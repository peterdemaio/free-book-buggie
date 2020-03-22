import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import ContactsListItem from '../ContactsListItem/ContactsListItem'
import { withStyles, Grid } from '@material-ui/core';
import ContactListNav from './ContactListNav';
import BackgroundImage from './HeaderBlueLight.png'


const styles = {
    background: {
        backgroundImage: `url(${BackgroundImage})`,
        // backgroundSize: 'covecontainr',
        backgroundRepeat: 'repeat',
        paddingLeft: '0',
        paddingRight: '0',
        width: '100%'
    },
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
class ContactsListPage extends React.Component {

    state = {
        searchQuery: "",
    }
    async componentDidMount() {
        this.props.dispatch({
            type: 'GET_CONTACTS'
        })
    }

    onInputChange = (event) => {
        this.setState({ searchQuery: event.target.value.toLowerCase() })
    }
   
    render() {
        let searchQuery = this.state.searchQuery
        const filteredList = this.props.reduxStore.contacts.filter(
            contact => contact.org_name.toLowerCase().includes(searchQuery) ||
                contact.contact_name.toLowerCase().includes(searchQuery)
        )

        let displayList

        if (filteredList.length === 0) {
            displayList = ('No results')
        } else {
            displayList = (
                filteredList.map(contact =>
                    <ContactsListItem key={contact.id} contact={contact} />
                )
            )
        }
        return (
            <div>
                <ContactListNav />
                <div className={this.props.classes.background}>
                    <Grid container
                        justify="center"
                        alignItems="center"
                        className={this.props.classes.searchBar}>
                        <span>Search for a contact by name or organization: </span><br></br>
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
                        alignItems="center">
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

const styledContactsListPage = withStyles(styles)(ContactsListPage)

export default connect(mapStateToProps)(styledContactsListPage)