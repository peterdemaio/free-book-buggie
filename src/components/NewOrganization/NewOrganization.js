import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';


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

        if (this.props.reduxStore.demographicsBoolean === true){
            alert('way to go, proud of you')
          
        }
        return (
            <>
                <div>
                    <h1 align="center">Add New Organization</h1>
                    {/* <button onClick={() => this.props.history.push('/collectBooks')}>Add</button>
                    <button onClick={() => this.props.history.push('/collectBooks')}>Cancel</button> */}
                    <form >
                        <input
                            placeholder="Name of Organization"
                            onChange={(event) => this.handleChangeFor(event, 'name')} />
                        <input
                            placeholder="Organization Logo Link"
                            onChange={(event) => this.handleChangeFor(event, 'logo')} />
                        <input
                            placeholder="Non-Profit, School, etc."
                            onChange={(event) => this.handleChangeFor(event, 'type')} />
                        <input
                            placeholder="Address Number"
                            onChange={(event) => this.handleChangeFor(event, 'address_number')} />
                        <input
                            placeholder="Address Street"
                            onChange={(event) => this.handleChangeFor(event, 'address_street')} />
                        <input
                            placeholder="Unit"
                            onChange={(event) => this.handleChangeFor(event, 'address_unit')} />
                        <input
                            placeholder="City"
                            onChange={(event) => this.handleChangeFor(event, 'city')} />
                        <input
                            placeholder="State"
                            onChange={(event) => this.handleChangeFor(event, 'state')} />
                        <input
                            placeholder="Zip"
                            onChange={(event) => this.handleChangeFor(event, 'zip')} />
                        <input
                            placeholder="County"
                            onChange={(event) => this.handleChangeFor(event, 'county')} />
                        <textarea
                            placeholder="Notes"
                            rows="6" cols="50"
                            onChange={(event) => this.handleChangeFor(event, 'notes')}
                        />

                    <br />
                    <button className='submit-button'
                    onClick={this.handleClick}>
                    Add </button>
                    <br/>
                    </form>
                </div>
            </>     
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(NewOrganization);