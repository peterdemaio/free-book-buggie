import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationsListItem from '../OrganizationsListItem/OrganizationsListItem'

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
        width: 300,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        background: 'white' // overrides gray background color
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 500,
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
        collectBooks: 0,
        distBooks: 0,
        numOfKids: 0,
        numEslAdults: 0,
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

    // mount organizations on page load
    componentDidMount() {
        this.props.dispatch({
            type: 'UPDATE_ORGANIZATIONS',
            payload: this.props.reduxStore.organizations
        })
    }

    // submit event handler
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
                collectBooks: this.state.collectBooks,
                distBooks: this.state.distBooks,
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
    };

    render() {

        let optionItems = this.props.reduxStore.organizations.map(org =>

        <option key={org.org_name}>{org.org_name} </option>
        );

        const { classes } = this.props;

        return (
            <>
                <h1>Events Page</h1>

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

                                value={this.state.event_name}
                                onChange={(event) => this.handleInputChangeFor(event, 'event_name')}>
                                <TextField
                                    className={this.props.classes.TextField}
                                    type="text"
                                    label="Event Name"
                                    margin="normal"
                                // fullWidth
                                // InputProps={{
                                //     className: classes.input,
                                // }}
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

                            <Select>
                                {optionItems}
                            </Select>

                            {/* <FormControl
                                className={classes.FormControl} >
                                <select>
                                    {optionItems}
                                </select>
                            </FormControl> */}

                            <FormControl
                                className={this.props.classes.FormControl}
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
                                value={this.state.collectBooks}
                                onChange={(event) => this.handleInputChangeFor(event, 'collectBooks')}>
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
                            {/* Select */}
                            <FormControl
                                className={classes.FormControl}
                                value={this.state.distBooks}
                                onChange={(event) => this.handleInputChangeFor(event, 'distBooks')}>
                                <TextField
                                    type="number"
                                    label="Books Distributed"
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