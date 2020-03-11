import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    form: {
        minWidth: '300px'
    }
});

// function PaperSheet(props) {
//     const { classes } = props;


class NewOrganization extends Component {

    state = {
        newEntry: {
            name: '',
            logo: '',
            type: '',
            address_number: '',
            address_unit: '',
            address_street: '',
            city: '',
            state: '',
            county: '',
            zip: '',
            notes: '',
            contact_name: '',
            phone_number: '',
            phone_number_type: '',
            email: '',
            notes: ''
        },
    }

    handleChangeFor = (event, propertyName) => {
        console.log(event.target.value, propertyName);
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                [propertyName]: event.target.value
            }
        })
    }

    handleClick = async (event) => {
        event.preventDefault()
        try {
            await this.props.dispatch({
                type: 'POST_NEW_ORGANIZATION',
                payload: this.state.newEntry
            })
        } catch {
            console.log('dispatch error')
        }
    }

    render() {

        if (this.props.reduxStore.demographicsBoolean === true) {
            alert('way to go, proud of you')
        }

      

        return (
            
            <>
                <Grid >
                    <Grid item lg={6}
                        justify="center"
                        className={this.props.classes.form}
                    >
                        <h1 align="center">Add New Organization</h1>
                        {/* <button onClick={() => this.props.history.push('/collectBooks')}>Add</button>
                    <button onClick={() => this.props.history.push('/collectBooks')}>Cancel</button> */}
                        <Paper elevation={5}>
                                <TextField
                                    type="text"
                                    label="Name of Organization"
                                    onChange={(event) => this.handleChangeFor(event, 'name')} />
                                
                                <TextField
                                    type="text"
                                    label="Organization Logo Link"
                                    onChange={(event) => this.handleChangeFor(event, 'logo')} />
                            
                                <TextField
                                    type="text"
                                    label="Non-Profit, School, etc."
                                    onChange={(event) => this.handleChangeFor(event, 'type')} />
                            
                                <TextField
                                    type="text"
                                    label="Address Number"
                                    onChange={(event) => this.handleChangeFor(event, 'address_number')} />
                            
                                <TextField
                                    type="text"
                                    label="Address Street"
                                    onChange={(event) => this.handleChangeFor(event, 'address_street')} />
                            
                                <TextField
                                    type="text"
                                    label="Unit"
                                    onChange={(event) => this.handleChangeFor(event, 'address_unit')} />
                            
                                <TextField
                                    type="text"
                                    label="City"
                                    onChange={(event) => this.handleChangeFor(event, 'city')} />
                            
                                <TextField
                                    type="text"
                                    label="State"
                                    onChange={(event) => this.handleChangeFor(event, 'state')} />
                            
                                <TextField
                                    type="text"
                                    label="Zip"
                                    onChange={(event) => this.handleChangeFor(event, 'zip')} />
                            
                                <TextField
                                    type="text"
                                    label="County"
                                    onChange={(event) => this.handleChangeFor(event, 'county')} />
                            </Paper>
                        </Grid >
                    </Grid>
                                {/* <textarea
                            placeholder="Notes"
                            rows="6" cols="50"
                            onChange={(event) => this.handleChangeFor(event, 'notes')}
                        /> */}

                                {/* <br />
                    <button className='submit-button'
                    onClick={this.handleClick}>
                    Add </button>
                    <br/> */}

                            

                  <Grid> 
                    <Grid item lg={6}>
                        <Paper>
                            <TextField
                                type="text"
                                label="Contact Name"
                                onChange={(event) => this.handleChangeFor(event, 'contact_name')} />
                            
                            <TextField
                                type="text"
                                label="Phone Number"
                                onChange={(event) => this.handleChangeFor(event, 'phone_number')} />
                                                                    
                            <TextField
                                type="text"
                                label="Phone Number Type"
                                helperText="Mobile, Home, etc."
                                onChange={(event) => this.handleChangeFor(event, 'phone_number_type')} />
                                                                    
                            <TextField
                                type="text"
                                label="Email"
                                helperText="name@mail.com"
                                onChange={(event) => this.handleChangeFor(event, 'email')} />
                                                                    
                            <TextField
                                type="text"
                                label="Notes"
                                onChange={(event) => this.handleChangeFor(event, 'notes')} />
                                                                   
                        </Paper>

                    
                   
                    
                    </Grid>
            </Grid>
                    <Button className='submit-button'
                        onClick={this.handleClick}>
                        Add </Button>
                        
            </>
                
        )
    }
}

   

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

let connectApp = connect(mapStateToProps)(NewOrganization)

export default withStyles(styles)(connectApp)