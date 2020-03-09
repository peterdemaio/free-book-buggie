import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationsListPage from '../OrganizationsListPage/OrganizationsListPage';


// Material UI imports
import {
    withStyles,
    Button,
    Grid,
    TextField
}
    from '@material-ui/core';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: '5px',
        marginRight: '5px',
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
    }

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
            [propertyName] : event.target.value
        })
    }

    render() {
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
                <TextField
                    className="addBooksField"
                    label="Number of Books"
                    type="number"
                    value={this.state.numOfBooks}
                    onChange={this.handleInputChangeFor('numOfBooks')}
                    margin="normal"
                    variant="filled"
                />
                <Button
                    className="Submit Books"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.submitBooks}
                    > Add Books
                </Button>
                <br/>
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