import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationsListItem from '../OrganizationsListItem/OrganizationsListItem';


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
            // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
});

class CollectBooks extends Component {
    state = {
        numOfBooks: '',
        orgType: '',
        type: 0,
        open: false,
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'UPDATE_ORGANIZATIONS',
            payload: this.props.reduxStore.organizations
        })
    }

    onInputChange = (event) => {
        console.log(event.target.value)
        let newlyDisplayed = this.props.reduxStore.organizations.filter( 
            organization => organization.org_name.toLowerCase().includes(event.target.value.toLowerCase()) || 
            organization.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
            organization.county.toLowerCase().includes(event.target.value.toLowerCase())
            );

        this.props.dispatch({
            type: 'UPDATE_ORGANIZATIONS',
            payload: newlyDisplayed
        })
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

    // submit books event handler
    submitBooks = (event) => {
        console.log('adding books', this.state.numOfBooks);
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_BOOKS',
            payload: {
                numOfBooks: this.state.numOfBooks,
                orgType: this.state.orgType
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
                <h1>Collect Books</h1>
                {/* Search functionality for orgs, make clickable to display info */}
                {/* <OrganizationsListPage /> */}
                <div>
                    <span>Search for an organization by name, city or county: </span>

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
                    alignItems="left"
                    >
                        {this.props.reduxStore.updateOrganizations.map(org =>

                            <OrganizationsListItem key={org.id} org={org} />
                        )}
                    </Grid>
                </div>
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
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Add Books and Organization Type</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} autoComplete="off">
                            <FormControl
                                className={classes.FormControl}
                                value={this.state.numOfBooks}
                                onChange={(event) => this.handleInputChangeFor(event, 'numOfBooks')}>
                                <TextField
                                    type="number"
                                    label="Number of Books"
                                    // margin="normal"
                                    // fullWidth
                                    className={classes.textField}
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>
                            <br />
                            <FormControl
                                className={classes.FormControl}
                                value={this.state.orgType}
                                onChange={(event) => this.handleInputChangeFor(event, 'orgType')}>
                                <TextField
                                    type="text"
                                    label="Organization Type"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                            </FormControl>

                            {/* <FormControl className={classes.container}>
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
                                    <MenuItem disabled value={0}>Select A Donor</MenuItem>
                                    <MenuItem value={1}>Organization</MenuItem>
                                    <MenuItem value={2}>Event</MenuItem>
                                    <MenuItem value={3}>Individual</MenuItem>
                                </Select>
                            </FormControl> */}
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