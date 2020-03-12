import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI imports
import {
    withStyles,
    Button,
    Grid,
    Paper,
    TextField,
    Select,
    MenuItem,
    InputLabel
}
    from '@material-ui/core';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    container: {
        minHeight: '400px'
    },
    form: {
        minWidth: '750px',
        maxWidth: '1000px',
        minHeight: '400px',
        minHeight: '350',
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
        padding: '10px'
    },
    submitButton: {
        justify: 'center',
        alignItems: 'center'
    },
    demographicsInputs: {
        width: '50px',
    },
    demographicsLine: {
        paddingLeft: '25px',
        paddingBottom: '10px',
        margin: '10px',

    },
    question: {
        paddingLeft: '25px'
    }

});


class CollectForm extends Component {

    state = {
        event_name: '',
        location: '',
        date: '',
        // organization_id: '',
        // contact_id: '',
        start_time: '',
        end_time: '',
        volunteers: '',
        collectBooks: 0,
        distBooks: 0,
        numOfKids: 0,
        numEslAdults: 0,
        notes: '',
        type: 0,
        open: false,
    }

    handleChange = name => event => {
        this.setState({ [name]: Number(event.target.value) });
    };

    // mount organizations on page load
    componentDidMount() {
        this.props.dispatch({
            type: 'UPDATE_ORGANIZATIONS',
            payload: this.props.reduxStore.organizations
        })
    }

    // submit event handler
    newEvent = (event) => {
        console.log('adding event', this.state.event_name);
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
                notes: this.state.notes
            }
        })
    }

    handleInputChangeFor = (event, propertyName) => {
        console.log('testing handleInputChangeFor')
        this.setState({
            [propertyName]: event.target.value
        })
    };

    render() {

        let optionItems = this.props.reduxStore.organizations.map(org =>

            <MenuItem key={org.org_name}>{org.org_name} </MenuItem>
        );

        const { classes } = this.props;

        return (
            <>
                <h1>Events Page</h1>

                <Grid className={this.props.classes.container}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid className={this.props.classes.form}
                        item lg={4}
                        justify="center"
                    ><h1 align="center">Add New Event</h1>
                        <Paper elevation={5}>
                            <span className={this.props.classes.line}>

                                <Select >
                                    <InputLabel>Organization Name</InputLabel>
                                    {optionItems}
                                </Select>
                                <br />
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
                                    className={this.props.classes.inputs}
                                    value={this.state.notes}
                                    type="text"
                                    margin="normal"
                                    label="Notes"
                                    onChange={(event) => this.handleInputChangeFor(event, 'notes')}
                                />
                                <Button color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.newEvent} color="primary">
                                    Submit
                                </Button>
                            </span>
                        </Paper>
                    </Grid>
                    <Button onClick={() => this.props.history.push('/editOrganization')}>Edit Organization</Button>
                    <Button onClick={() => this.props.history.push('/newOrganization')}>Add New Organization</Button>
                    <Button onClick={() => this.props.history.push('/home')}>Home</Button>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(CollectForm));