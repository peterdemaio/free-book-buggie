import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    TextField,
    Grid,
    FormControl,
    Paper,
    Select,
}
    from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NewOrganizationNav from './NewOrganizationNav'
import './NewOrganizationStyles.css';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    container: {
        minHeight: '400px'
    },
    form: {
        minWidth: '750px',
        maxWidth: '1000px',
        minHeight: '400px',
        display: 'block',
        justify: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    line: {
        padding: '25px',
        margin: '10px',

    },
    inputs: {
        width: '250px',
        padding: '10px'
    },
    submitButton: {
        justify: 'center',
        alignItems: 'center'
    },
    demographicsInputs: {
        width: '50px',
    },
    demographicsLine: {
        paddingLeft: '25px',
        paddingBottom: '10px',
        margin: '10px',

    },
    question: {
        paddingLeft: '25px',
        margin: '10px'
    },
    nameInput: {
        width: '400px',
    },
    nameLine: {
        paddingLeft: '35px',
        // margin: '10px',
    },
    dropdown: {
        paddingLeft: '25px'

    },
    dropdownMenu: {
        padding: '25px',
        width: '250px',
        paddingLeft: '25px',
        margin: '10px'
    },
    dropdownItem: {
        width: '250px',
        paddingLeft: '25px'
    }
});

class NewOrganization extends Component {
    state = {
        newEntry: {
            name: '',
            logo: '',
            url: '',
            type: '',
            address_number: '',
            address_unit: '',
            address_street: '',
            city: '',
            state: 'MN',
            county_id: '',
            zip: '',
            contact_name: '',
            title: '',
            phone_number: '',
            phone_number_type: '',
            email: '',
            notes: '',
            demographics_age_0_3: 0,
            demographics_age_4_7: 0,
            demographics_age_8_12: 0,
            demographics_age_13_18: 0,
            demographics_race_white: 0,
            demographics_race_black: 0,
            demographics_race_native: 0,
            demographics_race_asian: 0,
            demographics_race_pacific: 0,
            demographics_poverty: 0
        },
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_COUNTIES'
        })
    }

    handleChangeFor = (event, propertyName) => {
        console.log('Setting state for:', event.target.value, propertyName);
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                [propertyName]: event.target.value
            }
        })
        console.log(this.state.newEntry)
    }
    handleClick = async (event) => {
        event.preventDefault()
        console.log(this.state.newEntry)
        try {
            await this.props.dispatch({
                type: 'POST_NEW_ORGANIZATION',
                payload: this.state.newEntry
            })
            alert('Organization added!')

            this.props.history.push('/organizationsListPage')
        } catch {
            console.log('dispatch error')
        }
    }
    populateInputs = () => {
        this.setState({
            newEntry: {
                name: 'Big Brothers Big Sisters Twin Cities',
                logo: 'https://www.bigstwincities.org/wp-content/themes/bbbs/images/home-page-images-2019/Logo-Anniversary@2x.png',
                url: 'https://www.bigstwincities.org/',
                type: 'non-profit',
                address_number: '2550',
                address_unit: '#410N',
                address_street: 'University Ave W',
                city: 'St. Paul',
                state: 'MN',
                county_id: 62,
                zip: '55114',
                contact_name: 'Barb Johnson',
                title: 'Volunteer Coordinator',
                phone_number: '651-789-2400',
                phone_number_type: 'office',
                email: 'barb@bbbs.org',
                notes: '',
                demographics_age_0_3: 25,
                demographics_age_4_7: 25,
                demographics_age_8_12: 25,
                demographics_age_13_18: 25,
                demographics_race_white: 25,
                demographics_race_black: 50,
                demographics_race_native: 0,
                demographics_race_asian: 25,
                demographics_race_pacific: 0,
                demographics_poverty: 75
            },
        })
    }
    render() {
        let org = this.state.newEntry
        return (
            <>
                <NewOrganizationNav/>
                <Grid className={this.props.classes.container}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >

                
                    <h1 className="new-organization-styles">Add a New Organization</h1>

                    <div onClick={this.populateInputs}><h1 className="new-organization-styles">Add a new organization</h1></div>

                    <Paper elevation={5}>
                        <Grid item justify='center' alignItems='center' className={this.props.classes.nameLine}>
                            <TextField
                                className={this.props.classes.nameInput}
                                value={org.name}
                                margin="normal"
                                size='medium'
                                type="text"
                                label="Name of Organization"
                                onChange={(event) => this.handleChangeFor(event, 'name')} /></Grid>
                        <Grid className={this.props.classes.form}
                            item lg={4}
                            justify="center">
                            <br></br>
                            <span className={this.props.classes.line}>
                                <TextField
                                    className={this.props.classes.inputs}
                                    margin="normal"
                                    value={org.url}
                                    size='medium'
                                    type="text"
                                    label="Website Link"
                                    onChange={(event) => this.handleChangeFor(event, 'url')} />
                                <span>{' '}</span>
                                <TextField
                                    className={this.props.classes.inputs}
                                    margin="normal"
                                    value={org.logo}
                                    type="text"
                                    label="Organization Logo Link"
                                    onChange={(event) => this.handleChangeFor(event, 'logo')} />
                            </span>
                            <br></br>
                            <span className={this.props.classes.line}>
                                <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    label="Non-Profit, School, etc."
                                    value={org.type}
                                    onChange={(event) => this.handleChangeFor(event, 'type')} />
                                <span>{' '}</span>
                                <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    label="Address Number"
                                    value={org.address_number}
                                    onChange={(event) => this.handleChangeFor(event, 'address_number')} />
                            </span>
                            <br></br>
                            <span className={this.props.classes.line}>
                                <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    label="Address Street"
                                    value={org.address_street}
                                    onChange={(event) => this.handleChangeFor(event, 'address_street')} />
                                <span>{' '}</span>
                                <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    value={org.address_unit}
                                    label="Unit"
                                    onChange={(event) => this.handleChangeFor(event, 'address_unit')} />
                            </span>
                            <br></br>
                            <span className={this.props.classes.line}>
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={org.city}
                                    type="text"
                                    label="City"
                                    onChange={(event) => this.handleChangeFor(event, 'city')} />
                                <span>{' '}</span>
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={org.state}
                                    type="text"
                                    label="State"
                                    onChange={(event) => this.handleChangeFor(event, 'state')} />
                            </span>
                            <br></br>
                            <span className={this.props.classes.line}>
                                <TextField
                                    className={this.props.classes.inputs}
                                    value={org.zip}
                                    type="text"
                                    label="Zip"
                                    onChange={(event) => this.handleChangeFor(event, 'zip')} />
                            </span>
                            <br></br>
                            <span className={this.props.classes.dropdown}>County:  </span>
                            <FormControl >
                                <Select
                                    native
                                    className={this.props.classes.dropdownItem}
                                    value={org.county_id}
                                    onChange={(event) => this.handleChangeFor(event, 'county_id')}>
                                    {this.props.reduxStore.counties.map(county =>
                                        <option value={county.county_id} className={this.props.classes.dropdownMenu}>{county.county_name}</option>
                                    )}
                                </Select>
                            </FormControl>
                            <br/>
                            <br/>
                            <h3 className={this.props.classes.question}>If you have demographics information please record it below.</h3>
                            <Grid container
                                className={this.props.classes.demographicsLine}
                                direction="column"
                                justify="center"
                                alignItems="flex-start"
                            ><p>Age breakdown by percentage (Should add up to 100%):</p>
                                <Grid item>

                                    <TextField
                                        className={this.props.classes.demographicsInputs}
                                        type="integer"
                                        value={org.demographics_age_0_3}
                                        onChange={(event) => this.handleChangeFor(event, 'demographics_age_0_3')} />
                                    <span>0-3</span></Grid><Grid item>

                                    <TextField
                                        className={this.props.classes.demographicsInputs}
                                        type="text"
                                        value={org.demographics_age_4_7}
                                        onChange={(event) => this.handleChangeFor(event, 'demographics_age_4_7')} />
                                    <span>4-7</span></Grid><Grid item>

                                    <TextField
                                        className={this.props.classes.demographicsInputs}
                                        type="text"
                                        value={org.demographics_age_8_12}
                                        onChange={(event) => this.handleChangeFor(event, 'demographics_age_8-12')} />
                                    <span>8-12</span></Grid><Grid item>

                                    <TextField
                                        className={this.props.classes.demographicsInputs}
                                        type="text"
                                        value={org.demographics_age_13_18}
                                        onChange={(event) => this.handleChangeFor(event, 'demographics_age_13_18')} />
                                    <span>13-18</span></Grid>
                            </Grid>
                            <Grid container
                                className={this.props.classes.demographicsLine}
                                direction="column"
                                justify="center"
                                alignItems="flex-start"
                            ><p>Racial breakdown by percentage (Should add up to 100%):</p>
                                <Grid item>
                                    <TextField
                                        className={this.props.classes.demographicsInputs}
                                        type="integer"
                                        value={org.demographics_race_white}
                                        onChange={(event) => this.handleChangeFor(event, 'demographics_race_white')} />
                                    <span>White</span></Grid><Grid item>
                                    <TextField
                                        className={this.props.classes.demographicsInputs}
                                        type="text"
                                        value={org.demographics_race_black}
                                        onChange={(event) => this.handleChangeFor(event, 'demographics_race_black')} />
                                    <span>Black or African American:</span></Grid><Grid item>
                                    <TextField
                                        className={this.props.classes.demographicsInputs}
                                        type="text"
                                        value={org.demographics_race_native}
                                        onChange={(event) => this.handleChangeFor(event, 'demographics_race_native')} />
                                    <span>American Indian or Alaska Native:</span></Grid><Grid item>
                                    <TextField
                                        className={this.props.classes.demographicsInputs}
                                        type="text"
                                        value={org.demographics_race_asian}
                                        onChange={(event) => this.handleChangeFor(event, 'demographics_race_asian')} />
                                    <span>Asian</span></Grid><Grid item>
                                    <TextField
                                        className={this.props.classes.demographicsInputs}
                                        type="text"
                                        value={org.demographics_race_pacific}
                                        onChange={(event) => this.handleChangeFor(event, 'demographics_race_pacific')} />
                                    <span>Native Hawaiian or Pacific Islander</span></Grid>
                            </Grid>
                            <Grid container
                                className={this.props.classes.demographicsLine}
                                direction="column"
                                justify="center"
                                alignItems="flex-start"
                            ><p>Percentage of children who qualify for free or reduced school lunch:</p>
                                <TextField
                                    className={this.props.classes.demographicsInputs}
                                    type="integer"
                                    value={org.demographics_poverty}
                                    onChange={(event) => this.handleChangeFor(event, 'demographics_poverty')} />
                            </Grid>

                        </Grid >
                    </Paper>
                    <Grid item lg={4}
                        justify="center"
                        className={this.props.classes.form}
                    ><h2 align="center">Contact Information</h2>
                        <Paper elevation={5}>
                            <span className={this.props.classes.line}>
                                <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    label="Contact Name"
                                    value={org.contact_name}
                                    onChange={(event) => this.handleChangeFor(event, 'contact_name')} />

                                <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    label="Title"
                                    value={org.title}
                                    helperText="director, volunteer, etc"
                                    onChange={(event) => this.handleChangeFor(event, 'title')} />
                            </span>
                            <br></br>
                            <span className={this.props.classes.line}>
                                <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    value={org.phone_number}
                                    label="Phone Number"
                                    helperText="xxx-xxx-xxxx"
                                    onChange={(event) => this.handleChangeFor(event, 'phone_number')} />
                                <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    label="Phone Number Type"
                                    value={org.phone_number_type}
                                    helperText="Mobile, Home, etc."
                                    onChange={(event) => this.handleChangeFor(event, 'phone_number_type')} />
                                <br></br>
                            </span>
                            <span className={this.props.classes.line}>
                            <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    label="Email"
                                    value={org.email}
                                    helperText="name@mail.com"
                                    onChange={(event) => this.handleChangeFor(event, 'email')} />
                                <TextField
                                    className={this.props.classes.inputs}
                                    type="text"
                                    label="Notes"
                                    value={org.notes}
                                    onChange={(event) => this.handleChangeFor(event, 'notes')} />
                            </span>
                        </Paper>
                    </Grid>
                    <Button className={this.props.classes.submitButton}
                        onClick={this.handleClick}
                        size={'large'}
                        variant={'outlined'}>
                        Add
                    </Button>
                    <br/>
                   
                    </Grid>
             
            </>
        )
    }
}


const mapStateToProps = (reduxStore) => ({
    reduxStore
})

let connectApp = connect(mapStateToProps)(NewOrganization)

export default withStyles(styles)(connectApp)