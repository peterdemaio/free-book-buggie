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
        // display: 'block',
        justify: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    line: {
        padding: '25px',
        margin: '10px',
        alignItems: 'center',
    },
    inputs: {
        width: '250px',
        padding: '25px',
        margin: '10px',
        backgroundColor: 'white'
    },
    dropdown: {
        width: '250px',
        alignItems: 'center',
    },
    notes: {
        width: '400px',
        padding: '25px',
        margin: '10px',
    },
    button: {
        width: '100px',
        padding: '25px',
        margin: '10px',

    }
});

class volunteerEvent extends Component {

    state = {
        collectBooks: 0,
        distBooks: 0,
        numOfKids: 0,
        event_id: 1,
        notes: '',
    }

    // get all events on page load
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EVENTS',
            payload: this.props.reduxStore.eventReducer
        })
    }

    // submit event handler
    addData = (event) => {
        console.log('adding event', this.state);
        event.preventDefault();
        this.props.dispatch({
            // set up new saga for dispatch type
            type: 'VOLUNTEER_EVENT',
            payload: {
                collectBooks: this.state.collectBooks,
                distBooks: this.state.distBooks,
                numOfKids: this.state.numOfKids
            }
        })
        alert('Books Successfully Added!')
    }

    handleInputChangeFor = (event, propertyName) => {
        console.log('testing handleInputChangeFor')
        this.setState({
            [propertyName]: event.target.value
        })
    };

    render() {

        // map over event reducer and grab the event
        let eventList = this.props.reduxStore.currentEventReducer.map(event =>
            <option value={event.id} key={event.event_name} className={this.props.classes.dropdown}>{event.event_name}</option>
        );

        return (

            <>
                <Grid
                    className={this.props.classes.container}
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
                        alignItems="center"
                    >
                        <h1 align="center">Add Books By Event</h1>
                        <Paper elevation={5}>
                            <span className={this.props.classes.line}>

                                <FormControl className={this.props.classes.inputs} >
                                    <InputLabel>Event Name</InputLabel>
                                    <Select
                                        native
                                        className={this.props.classes.dropdown}
                                        onChange={(event) => this.handleInputChangeFor(event, 'event_id')}>
                                        >
                                        {eventList}
                                    </Select>
                                </FormControl>

                                <br />

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
                                    onClick={this.addData} color="primary">
                                    Submit
                                </Button>

                            </span>
                        </Paper>
                    </Grid>
                    <Button onClick={() => this.props.history.push('/home')}>
                        Home</Button>
                </Grid>
            </>
        )
    }
}



const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(volunteerEvent));