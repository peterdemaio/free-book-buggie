import React, { Component } from 'react';
import { connect } from 'react-redux';
// import OrganizationsListPage from '../OrganizationsListPage/OrganizationsListPage';

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
    MenuItem,
    OutlinedInput,
    FormControl,
    TextField,
    Select,
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
    },
});



class DistributeBooks extends Component {

    state = {
        numOfBooks: '',
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

    submitBooks = (event) => {
        console.log('adding books', this.state.numOfBooks);
        event.preventDefault();
        this.props.dispatch({
            type: 'DISTRIBUTE_BOOKS',
            payload: {
                numOfBooks: this.state.numOfBooks,
                type: this.state.type
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

                <h1>Distribute Books</h1>

                {/* Search functionality for orgs, make clickable to display info */}
                {/* <OrganizationsListPage /> */}


                <Grid container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={10}
                >
                    <Grid item
                        direction="column"
                        justify="flex-end"
                        alignItems="flex-end"
                    >
                        <Button
                            onClick={this.handleClickOpen}
                            variant="contained"
                            color="primary"
                        >Add Books</Button>
                        <br />
                        <Button container
                            color="primary"
                            className={this.props.classes.button}
                            onClick={() => this.props.history.push('/newOrganization')}
                        >
                            New Organization
                            </Button>
                        <br />
                        {/* <Button
                            color="primary"
                            className={this.props.classes.button}
                            onClick={() => this.props.history.push('/newEvent')}
                        >
                            New Event
                            </Button>
                        <br /> */}
                        <Button
                            color="primary"
                            className={this.props.classes.button}
                            onClick={() => this.props.history.push('/newIndividual')}
                        >
                            New Individual
                            </Button>
                    </Grid>
                </Grid>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle> Number of Books and Distribution Type</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} autoComplete="off">
                            <FormControl

                                className={classes.FormControl}
                                value={this.state.numOfBooks}
                                onChange={(event) => this.handleInputChangeFor(event, 'numOfBooks')}>


                                <TextField
                                    type="number"
                                    label="Number of Books"
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />

                            </FormControl>
                            <br />
                            <FormControl className={classes.container}>
                                <InputLabel
                                    htmlFor="type-donor"
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                >Type of Donor</InputLabel>
                                <Select
                                    value={this.state.type}
                                    onChange={this.handleChange('type')}

                                    // input={<BootstrapInput name="age" id="type-donor" />}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
                                            name="age"
                                            id="type-donor"
                                        />
                                    }
                                    defaultValue={0}
                                >
                                    >
                                    <MenuItem disabled value={0}>Select One</MenuItem>
                                    <MenuItem value={1}>Give-Away</MenuItem>
                                    <MenuItem value={2}>Event</MenuItem>
                                </Select>
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

                <h1>DistributeBooks page</h1>
                <button onClick={this.props.history.push('/newOrganization')}>Add New Organization</button>
                <button onClick={this.props.history.push('/home')}>Add Books</button>

            </>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(DistributeBooks));