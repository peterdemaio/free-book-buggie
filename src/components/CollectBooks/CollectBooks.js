import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI imports
import {
    withStyles,
    Button,
    Grid
}
    from '@material-ui/core';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class CollectBooks extends Component {



    render() {
        return (
            <>
                <h1>CollectBooks page</h1>
                <Grid container
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

                <button onClick={() => this.props.history.push('/editOrganization')}>Sample Organization</button>
                <button onClick={() => this.props.history.push('/newOrganization')}>Add New Organization</button>
                <button onClick={() => this.props.history.push('/home')}>Home</button>
            </>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(CollectBooks));