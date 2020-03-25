import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewEventNav from './NewEventNav'
import './NewEventStyle.css';

// Material UI imports
import {
    withStyles,
    Button,
    Grid,
    Paper,
    TextField,
    Select,
    InputLabel,
    FormControl,
}
    from '@material-ui/core';

const styles = theme => ({
    
    container: {
        minHeight: '400px'
    },
    form: {
        minWidth: '750px',
        maxWidth: '1000px',
        minHeight: '400px',
        display: 'block',
        justify: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    line: {
        padding: '25px',
        margin: '10px',
    },
    inputs: {
        width: '250px',
        padding: '25px',
        margin: '10px',
        backgroundColor: 'white'
    },
    dropdown: {
        width: '250px',
    },
    notes: {
        width: '400px',
        padding: '25px',
        margin: '10px',
    },
    button: {
        width: '250px',
        padding: '10px',
        margin: '20px',
        marginLeft: '140px'
    }
});

class NewEvent extends Component {

    state = {
        event_name: '',
        location: '',
        date: '',
        organization_id: 1,
        contact_id: 1,
        start_time: '',
        end_time: '',
        volunteers: '',
        collectBooks: 0,
        distBooks: 0,
        numOfKids: 0,
        numEslAdults: 0,
        notes: '',
    }

    // mount organizations on page load
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_ORGANIZATIONS',
            payload: this.props.reduxStore.organizations
        })
        this.props.dispatch({
            type: 'GET_CONTACTS',
            payload: this.props.reduxStore.contacts
        })
    }

    // submit event handler
    newEvent = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_EVENT',
            payload: {
                event_name: this.state.event_name,
                location: this.state.location,
                date: this.state.date,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                volunteers: this.state.volunteers,
                collectBooks: this.state.collectBooks,
                distBooks: this.state.distBooks,
                numOfKids: this.state.numOfKids,
                numEslAdults: this.state.numEslAdults,
                notes: this.state.notes,
                organization_id: this.state.organization_id,
                contact_id: this.state.contact_id,
            }
        })
        alert('Event Successfully Added!')
    }

    handleInputChangeFor = (event, propertyName) => {
        this.setState({
            [propertyName]: event.target.value
        })
    };

    /////// for demonstration purposes
    // populateInputs = () => {
    //     this.setState({
    //         event_name: 'Big Brothers/Big Sisters Book Distribution Day',
    //         location: 'St. Paul Office',
    //         date: '2020-03-31',
    //         organization_id: 11,
    //         contact_id: 11,
    //         start_time: '12:00:00',
    //         end_time: '14:00:00',
    //         volunteers: 'Sue',
    //         collectBooks: 0,
    //         distBooks: 100,
    //         numOfKids: 50,
    //         numEslAdults: 0,
    //         notes: '',
    //     })
    // }

    render() {

        // map over organizations, display in drop down, store in local state when clicked
        let orgList = this.props.reduxStore.organizations.map(org =>
            <option value={org.id} key={org.org_name} className={this.props.classes.dropdown}>{org.org_name} </option>
        );

        // map over contacts, display in drop down, store in local state when clicked
        let contactList = this.props.reduxStore.contacts.map(people =>
            <option value={people.id} key={people.contact_name} className={this.props.classes.dropdown}>{people.contact_name} </option>
        );

        return (
            <>

                <NewEventNav />
                <Grid className={this.props.classes.container}

                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        container
                        className={this.props.classes.form}
                        item lg={4}
                        justify="center"
                    >
                        {/* <div onClick={this.populateInputs}> */}
                            <h1 className="new-event-styles">Add an Event</h1>
                        {/* </div> */}
                        <Paper elevation={5}>
                            <span className={this.props.classes.line}>

                                
                                <FormControl className={this.props.classes.inputs} >
                                    <InputLabel>Organization Name</InputLabel>
                                    <Select
                                        native
                                        className={this.props.classes.dropdownItem}
                                        value={this.state.organization_id}
                                        onChange={(event) => this.handleInputChangeFor(event, 'organization_id')}>
                                        >
                                        {orgList}
                                    </Select>
                                </FormControl>

                                <FormControl className={this.props.classes.inputs} >
                                    <InputLabel>Contact Name</InputLabel>
                                    <Select
                                        native
                                        className={this.props.classes.dropdownItem}
                                        value={this.state.contact_id}
                                        onChange={(event) => this.handleInputChangeFor(event, 'contact_id')}>
                                        {contactList}
                                    </Select>
                                </FormControl>
                                {/* </form> */}

                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.event_name}
                                    type="text"
                                    label="Event Name"
                                    margin="normal"
                                    onChange={(event) => this.handleInputChangeFor(event, 'event_name')}
                                />
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.volunteers}
                                    type="text"
                                    label="Names of Volunteers"
                                    margin="normal"
                                    onChange={(event) => this.handleInputChangeFor(event, 'volunteers')}
                                />
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.location}
                                    type="text"
                                    margin="normal"
                                    label="Location of Event"
                                    onChange={(event) => this.handleInputChangeFor(event, 'location')}
                                />
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.start_time}
                                    type="time"
                                    label="Start Time"
                                    margin="normal"
                                    onChange={(event) => this.handleInputChangeFor(event, 'start_time')}
                                />
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.end_time}
                                    type="time"
                                    label="End Time"
                                    margin="normal"
                                    onChange={(event) => this.handleInputChangeFor(event, 'end_time')}
                                />
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.date}
                                    type="date"
                                    margin="normal"
                                    label="Date of Event"
                                    onChange={(event) => this.handleInputChangeFor(event, 'date')}
                                />
                                {/* conditionally render...? */}
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.collectBooks}
                                    type="number"
                                    label="Books Collected"
                                    margin="normal"
                                    onChange={(event) => this.handleInputChangeFor(event, 'collectBooks')}
                                />
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.distBooks}
                                    type="number"
                                    label="Books Distributed"
                                    margin="normal"
                                    onChange={(event) => this.handleInputChangeFor(event, 'distBooks')}
                                />
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.numOfKids}
                                    type="number"
                                    label="Number of Children"
                                    margin="normal"
                                    onChange={(event) => this.handleInputChangeFor(event, 'numOfKids')}
                                />
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={this.state.numEslAdults}
                                    type="number"
                                    label="Number of ESL Adults"
                                    margin="normal"
                                    onChange={(event) => this.handleInputChangeFor(event, 'numEslAdults')}
                                />
                                <TextField
                                    className={this.props.classes.notes}
                                    value={this.state.notes}
                                    type="text"
                                    margin="normal"
                                    label="Notes"
                                    onChange={(event) => this.handleInputChangeFor(event, 'notes')}
                                />
                                <Button
                                    className={this.props.classes.button}
                                    color="primary">
                                    Cancel
                                </Button>

                                <Button
                                    className={this.props.classes.button}
                                    onClick={this.newEvent} color="primary">
                                    Submit
                                </Button>
                            </span>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(NewEvent));