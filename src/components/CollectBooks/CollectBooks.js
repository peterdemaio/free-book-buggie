import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationsListPage from '../OrganizationsListPage/OrganizationsListPage';


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
    FormControl,
    TextField,
    Select,
    Option,
}
    from '@material-ui/core';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

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
});

class CollectBooks extends Component {

    // let id = this.props.id
    // let index = id - 1
    // let organization = this.props.reduxStore.organization[index]

    // componentDidMount() {
    //     console.log('organizations page ready')
    //     this.props.dispatch({
    //         type: 'GET_ORGANIZATIONS'
    //     })
    // }

    state = {
        numOfBooks: '',
        eventType: '',
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
        console.log('adding books');
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_BOOKS',
            payload: {
                numOfBooks: this.state.numOfBooks,
            }
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <h1>Collect Books</h1>
                {/* Search functionality for orgs, make clickable to display info */}
                {/* <OrganizationsListPage /> */}


                <Grid container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={12}
                >
                    <Grid item
                        direction="column"
                        justify="flex-end"
                        alignItems="flex-end"
                    >
                        <Button container
                            color="primary"
                            className={this.props.classes.button}
                            onClick={() => this.props.history.push('/newOrganization')}
                        >
                            New Organization
                            </Button>
                        <br />
                        <Button
                            color="primary"
                            className={this.props.classes.button}
                            onClick={() => this.props.history.push('/newEvent')}
                        >
                            New Event
                            </Button>
                        <br />
                        <Button
                            color="primary"
                            className={this.props.classes.button}
                            onClick={() => this.props.history.push('/newIndividual')}
                        >
                            New Individual
                            </Button>
                    </Grid>
                </Grid>

                <Button
                    onClick={this.handleClickOpen}
                    variant="contained"
                    color="primary"
                >Add Books</Button>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Add Books and Organization Type</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} autoComplete="off">
                            <FormControl className={classes.margin}>
                                <InputLabel htmlFor="number">Number</InputLabel>
                                <BootstrapInput />
                                {/* <Select
                                    native
                                    value={this.state.numOfBooks}
                                    onChange={this.handleChange('age')}
                                    input={<Input id="age-native-simple" />}
                                >
                                    <option type="number" />
                                </Select> */}
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">Age</InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleChange('age')}
                                    input={<Input id="age-simple" />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                {/* <TextField
                    className="addBooksField"
                    label="Number of Books"
                    type="number"
                    value={this.state.numOfBooks}
                    onChange={this.handleInputChangeFor('numOfBooks')}
                    margin="normal"
                    variant="filled"
                />
                <Select ClassName="optionBox" color="primary" onChange={this.setSupport}>
                    <Option value="Individual">Individual</Option>
                    <Option value="Event">Event</Option>
                    <Option value="Organization">Organization</Option>
                </Select>
                <Button
                    className="Submit Books"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.submitBooks}
                > Add Books
                </Button> */}
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

export default connect(mapStateToProps)(withStyles(styles)(CollectBooks));