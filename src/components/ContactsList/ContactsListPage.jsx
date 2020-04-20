import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import ContactsListItem from '../ContactsListItem/ContactsListItem';
import ContactsListPageNav from '../ContactsList/ContactListNav';
import { withStyles, Grid } from '@material-ui/core';
import BackgroundImage from './HeaderBlueLight.png';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
    table: {
        width: '80%',
        marginRight: '15px',
        marginLeft: '35px',
        margin: '2em',
    },
    tableHead: {
        backgroundColor: 'lightGrey',
        fontSize: '34px',
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
                <ContactsListPageNav />
                <div className={this.props.classes.background}>
                    <Grid container
                        justify="center"
                        alignItems="center"
                        className={this.props.classes.searchBar}
                        style={{ fontSize: '34px' }}>
                        <span>Search for a contact by name or organization: </span>
                        <Input
                            className={this.props.classes.input}
                            placeholder="search here "
                            onChange={this.onInputChange}
                            value={this.state.searchQuery}>
                        </Input>
                    </Grid>
                    <Table size="small" aria-label="contact table" className={this.props.classes.table}
                        fixedHeader={false} style={{ width: "auto", tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow className={this.props.classes.tableHead}>
                                <TableCell style={{ fontSize: '24px', width: "25%" }} >Contact Name</TableCell>
                                <TableCell style={{ fontSize: '24px', width: "25%" }} >Organization</TableCell>
                                <TableCell style={{ fontSize: '24px', width: "15%" }}>Phone Number</TableCell>
                                <TableCell style={{ fontSize: '24px', width: "15%" }}>email</TableCell>
                                <TableCell style={{ fontSize: '24px', width: "20%" }}>Notes</TableCell>
                                <TableCell style={{ fontSize: '24px', width: "5%" }}></TableCell>
                                <TableCell style={{ fontSize: '24px', width: "5%" }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayList}
                        </TableBody>
                    </Table>
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