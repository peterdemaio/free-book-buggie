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

        const { classes } = this.props;

        return (
            <>
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="age-customized-select" className={classes.bootstrapFormLabel}>
                            Age
          </InputLabel>
                        <BootstrapInput />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="age-customized-select" className={classes.bootstrapFormLabel}>
                            Age
          </InputLabel>
                        <Select
                            value={this.state.age}
                            onChange={this.handleChange}
                            input={<BootstrapInput name="age" id="age-customized-select" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="age-customized-native-simple" className={classes.bootstrapFormLabel}>
                            Age
          </InputLabel>
                        <NativeSelect
                            value={this.state.age}
                            onChange={this.handleChange}
                            input={<BootstrapInput name="age" id="age-customized-native-simple" />}
                        >
                            <option value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </form>
    );
              }
            }
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

NewOrganization.propTypes = {
    classes: PropTypes.object.isRequired,
};

let connectApp = connect(mapStateToProps)(NewOrganization)


export default withStyles(styles)(connectApp);