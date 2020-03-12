import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI imports
import {
    withStyles,
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    InputBase,
    Input,
    MenuItem,
    OutlinedInput,
    FormControl,
    NativeSelect,
    FormHelperText,
    TextField,
    Select,
    Option,
}
    from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
    button: {
        alignItems: 'center'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        background: 'white' // overrides gray background color
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
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
        booksIn: '',
        booksOut: '',
        numOfKids: '',
        numEslAdults: '',
        type: 0,
        open: false,
    }

    // MUI Select controls
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({ [name]: Number(event.target.value) });
    };

    // submit event handler
    // change payload to state variables
    submitBooks = (event) => {
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
                booksIn: this.state.booksIn,
                booksOut: this.state.booksOut,
                numOfKids: this.state.numOfKids,
                numEslAdults: this.state.numEslAdults
            }
        })
    }

    handleInputChangeFor = (event, propertyName) => {
        console.log('testing handleInputChangeFor')
        this.setState({
            [propertyName]: event.target.value
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <>
                <h1>Collection Form</h1>

                <Grid container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={10}
                >

                    <Button
                        onClick={this.handleClickOpen}
                        variant="contained"
                        color="primary"
                    >Add Event</Button>
                </Grid>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >

                    <DialogTitle>Event Collection Form</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} autoComplete="off">
                            <FormControl
                                className={classes.FormControl}
                                value={this.state.event_name}
                                onChange={(event) => this.handleInputChangeFor(event, 'event_name')}>
                                <TextField
                                    type="text"
                                    label="Event Name"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            <FormControl
                                className={classes.FormControl}
                                value={this.state.date}
                                onChange={(event) => this.handleInputChangeFor(event, 'date')}>
                                <TextField
                                    type="date"
                                    label="Date of Event"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            <FormControl
                                className={classes.FormControl}
                                value={this.state.location}
                                onChange={(event) => this.handleInputChangeFor(event, 'location')}>
                                <TextField
                                    type="text"
                                    label="Location of Event"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            <FormControl
                                className={classes.FormControl}
                                value={this.state.start_time}
                                onChange={(event) => this.handleInputChangeFor(event, 'start_time')}>
                                <TextField
                                    type="time"
                                    label="Start Time"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            <FormControl
                                className={classes.FormControl}
                                value={this.state.end_time}
                                onChange={(event) => this.handleInputChangeFor(event, 'end_time')}>
                                <TextField
                                    type="time"
                                    label="End Time"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            <FormControl
                                className={classes.FormControl}
                                value={this.state.volunteers}
                                onChange={(event) => this.handleInputChangeFor(event, 'volunteers')}>
                                <TextField
                                    type="text"
                                    label="Names of Volunteers"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            {/* conditionally render...? */}

                            <FormControl
                                className={classes.FormControl}
                                value={this.state.booksIn}
                                onChange={(event) => this.handleInputChangeFor(event, 'booksIn')}>
                                <TextField
                                    type="number"
                                    label="Books Collected"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            {/* conditionally render...? */}

                            <FormControl
                                className={classes.FormControl}
                                value={this.state.booksOut}
                                onChange={(event) => this.handleInputChangeFor(event, 'booksOut')}>
                                <TextField
                                    type="number"
                                    label="Books Donated"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            <FormControl
                                className={classes.FormControl}
                                value={this.state.numOfKids}
                                onChange={(event) => this.handleInputChangeFor(event, 'numOfKids')}>
                                <TextField
                                    type="number"
                                    label="Number of Children"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            <FormControl
                                className={classes.FormControl}
                                value={this.state.numEslAdults}
                                onChange={(event) => this.handleInputChangeFor(event, 'numOfEslAdults')}>
                                <TextField
                                    type="number"
                                    label="Number of ESL Adults"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} onClick={this.submitBooks} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Nav Links */}
                <br />
                <Button onClick={() => this.props.history.push('/editOrganization')}>Sample Organization</Button>
                <Button onClick={() => this.props.history.push('/newOrganization')}>Add New Organization</Button>
                <Button onClick={() => this.props.history.push('/home')}>Home</Button>
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(CollectForm));