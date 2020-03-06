import React, { Component } from 'react';
import { connect } from 'react-redux';

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

        }
    }

    handleNameChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                name: this.state.name  
            }
        })
    }
    handleLogoChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                logo: this.state.logo
            }
        })
    }
    handleTypeChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                type: this.state.type
            }
        })
    }
    handleAddressNumberChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                address_number: this.state.address_number
            }
        })
    }
    handleAddressStreetChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                address_street: this.state.address_street
            }
        })
    }
    handleAddressUnitChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                address_unit: this.state.address_unit
            }
        })
    }
    handleCityChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                state: this.state.city
            }
        })
    }
    handleStateChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                city: this.state.state
            }
        })
    }
    handleZipChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                zip: this.state.zip
            }
        })
    }
    handleCountyChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                county: this.state.county
            }
        })
    }
    handleNotesChangeFor = (event) => {
        console.log(event.target.value)
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                notes: this.state.notes
            }
        })
    }

    handleClick = (event) => {
        event.preventDefault()
        this.props.dispatch({
            type: 'POST_NEW_ORGANIZATION',
            payload: this.state.newEntry
        })
        this.props.history.push(`/organizationsListPage`);
    }

    render() {
        return (
            <>
                <div>
                    <h1>Add New Organization</h1>
                    <button onClick={() => this.props.history.push('/collectBooks')}>Save</button>
                    <button onClick={() => this.props.history.push('/collectBooks')}>Cancel</button>

                    <input
                    placeholder="Name of Organization"
                    onChange={(event) => this.handleNameChangeFor(event)} />
                    <input
                    placeholder="Organization Logo Link"
                    onChange={(event) => this.handleLogoChangeFor(event)} />
                    <input
                    placeholder="Non-Profit, School, etc."
                    onChange={(event) => this.handleTypeChangeFor(event)} />
                    <input
                    placeholder="Address Number"
                    onChange={(event) => this.handleAddressNumberChangeFor(event)} />
                    <input
                    placeholder="Address Street"
                    onChange={(event) => this.handleAddressStreetChangeFor(event)} />
                    <input
                    placeholder="Unit"
                    onChange={(event) => this.handleAddressUnitChangeFor(event)} />
                    <input
                    placeholder="City"
                    onChange={(event) => this.handleCityChangeFor(event)} />
                    <input
                    placeholder="State"
                    onChange={(event) => this.handleStateChangeFor(event)} />
                    <input
                    placeholder="Zip"
                    onChange={(event) => this.handleZipChangeFor(event)} />
                    <input
                    placeholder="County"
                    onChange={(event) => this.handleCountyChangeFor(event)} />
                    <textfield
                    placeholder="Notes"
                    onChange={(event) => this.handleNotesChangeFor(event)} />

                    <br />
                    <button className='submit-button'
                    onClick={this.handleClick}>
                        Add </button>
                </div>
            </>     
        )
    }
}

export default NewOrganization;