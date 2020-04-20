import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    withStyles,
    Button,
    Input,
    FormControl,
    Select,
    Dialog,
    DialogActions,
    DialogTitle
}
    from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const styles = theme => ({
    row: {
        opacity: '1.0',
        justify: 'flex-start',
        minWidth: '600px',
        maxWidth: '600px',
        padding: '10px',
        margin: '12px',
        textAlign: 'center',
        fontFamily: 'Museo Slab',
        '&:nth-of-type(odd)': {
            backgroundColor: 'snow'
        }
    },
    header: {
        color: '#ffffff',
        background: 'linear-gradient(45deg, #40C445 30%, #14771B 90%)',
        fontSize: '36px',
        opacity: '1'
    },
    underline: {
        borderBottom: '1px solid red',
        display: 'block'
    },
    content: {
        textAlign: 'left',
        '&:hover': {
            cursor: 'zoom-in'
        },
        fontSize: '26px',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    icon: {
        color: '#ffffff'
    },
    avatar: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    wideInput: {
        width: '500px'
    },
    smallInput: {
        width: '20px'
    },
    streetNumberInput: {
        width: '60px'
    },
    streetNameInput: {
        width: '300px'
    },
    notes: {
        width: '500px',
        height: '100px',
        border: '1px solid blue'
    }
})

class OrganizationsListPageItem extends React.Component {

    state = {
        setOpen: false,
        edit: false,
        open: false,
        address: {
            id: this.props.org.id,
            org_name: this.props.org.org_name,
            address_number: this.props.org.address_number,
            address_street: this.props.org.address_street,
            address_unit: this.props.org.address_unit,
            city: this.props.org.city,
            state: this.props.org.state,
            zip: this.props.org.zip,
            county_id: this.props.org.county_id,
            org_notes: this.props.org.org_notes || '',
        },
        demographics: {
            age_0_3: this.props.org.age_0_3,
            age_4_7: this.props.org.age_4_7,
            age_8_12: this.props.org.age_8_12,
            age_13_18: this.props.org.age_13_18,
            white: this.props.org.white,
            black_or_african_american: this.props.org.black_or_african_american,
            american_indian_or_alaska_native: this.props.org.american_indian_or_alaska_native,
            asian: this.props.org.asian,
            native_hawaiian_or_pacific_islander: this.props.org.native_hawaiian_or_pacific_islander,
            percentage_NSLP: this.props.org.percentage_NSLP
        }
    }
    edit = () => {
        this.setState({ edit: !this.state.edit })
    }

    handleClickOpen = () => {
        console.log('clicked the open button')
        this.setState({
            setOpen: true
        })
    };

    handleClose = () => {
        this.setState({
            setOpen: false
        })
    };

    delete = () => {
        this.setState({
            setOpen: false
        })
        this.props.dispatch({
            type: 'DELETE_ORG',
            payload: this.state.address
        })
    }

    setDetailsAddress = (event, type) => {
        // This updates state with the details submitted
        this.setState({
            address: {
                ...this.state.address,
                [type]: event.target.value
            }
        })
    }

    setDetailsDemographics = (event, type) => {
        // This updates state with the details submitted
        this.setState({
            demographics: {
                ...this.state.demographics,
                [type]: event.target.value
            }
        })
    }


    saveOrg = () => {
        this.props.dispatch({
            type: 'EDIT_ORGANIZATION',
            payload: {
                address: this.state.address,
                demographics: this.state.demographics
            }
        })
        this.setState({
            ...this.state,
            edit: false
        })
    }

    render() {
        let org = this.props.org
        let displayRow

        {
            if (this.state.edit === false) {
                displayRow = (
                    <TableRow key={org.id} className={this.props.classes.row}>
                        <TableCell colSpan={2}>{org.org_name}</TableCell>
                        <TableCell >{org.address_number} {org.address_street} {org.address_unit}</TableCell>
                        <TableCell >{org.city}</TableCell>
                        <TableCell >{org.state}</TableCell>
                        <TableCell >{org.zip}</TableCell>
                        <TableCell >{org.county_name}</TableCell>
                        <TableCell >{org.notes}</TableCell>
                        <TableCell><Button onClick={this.edit} variant="contained" size="small" color="primary">Edit</Button></TableCell>
                        <TableCell><Button onClick={this.handleClickOpen} variant="contained" size="small" color="secondary">Delete</Button></TableCell>
                        <Dialog
                            open={this.state.setOpen}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Are you sure you wish to delete this organization?"}</DialogTitle>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    No
                                </Button>
                                <Button onClick={this.delete} color="primary" autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </TableRow >
                )
            } else {
                displayRow = (
                    <>
                        < TableRow key={org.id} className={this.props.classes.row} >
                            <TableCell colSpan={2}>
                                <Input
                                    value={this.state.address.org_name}
                                    onChange={(event) => this.setDetailsAddress(event, 'name')}
                                ></Input></TableCell>
                            <TableCell style={{ fontSize: '18px', width: '200px' }}><Input
                                value={this.state.address.address_number}
                                onChange={(event) => this.setDetailsAddress(event, 'address_number')}
                            ></Input><Input
                                value={this.state.address.address_street}
                                onChange={(event) => this.setDetailsAddress(event, 'address_street')}
                            ></Input><Input
                                value={this.state.address.address_unit}
                                onChange={(event) => this.setDetailsAddress(event, 'address_unit')}
                            ></Input></TableCell>
                            <TableCell style={{ fontSize: '18px', width: '50px' }}><Input
                                value={this.state.address.city}
                                onChange={(event) => this.setDetailsAddress(event, 'city')}
                            ></Input></TableCell>
                            <TableCell style={{ fontSize: '18px', maxWidth: '20px' }}><Input
                                value={this.state.address.state}
                                onChange={(event) => this.setDetailsAddress(event, 'state')}
                            ></Input></TableCell>
                            <TableCell style={{ fontSize: '18px' }}><Input
                                value={this.state.address.zip}
                                onChange={(event) => this.setDetailsAddress(event, 'zip')}
                            ></Input></TableCell>
                            <TableCell style={{ fontSize: '18px' }}>
                                <FormControl >
                                    <Select
                                        defaultValue={this.state.address.county_id}
                                        native
                                        onChange={(event) => this.setDetailsAddress(event, 'county_id')}>
                                        {this.props.reduxStore.counties.map(county =>
                                            <option key={county.county_id} value={county.county_id} className={this.props.classes.dropdownMenu}>{county.county_name}</option>
                                        )}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell style={{ fontSize: '18px' }}><Input
                                value={this.state.address.org_notes}
                                onChange={(event) => this.setDetailsAddress(event, 'org_notes')}
                            ></Input></TableCell>
                            <TableCell><Button onClick={this.saveOrg} variant="contained" size="small" color="primary">Save</Button></TableCell>
                            <TableCell><Button onClick={this.edit} variant="contained" size="small" color="secondary">Cancel</Button></TableCell>
                        </TableRow >
                        <TableRow style={{ width: "auto", tableLayout: 'auto' }}>
                            <TableCell style={{ width: '10%' }}>Ages: 0-3</TableCell>
                            <TableCell style={{ width: '10%' }}>Ages: 4-7</TableCell>
                            <TableCell style={{ width: '10%' }}>Ages: 8-12</TableCell>
                            <TableCell style={{ width: '10%' }}>Ages: 13-18</TableCell>
                            <TableCell style={{ width: '10%' }}>White</TableCell>
                            <TableCell style={{ width: '10%' }}>Black</TableCell>
                            <TableCell style={{ width: '10%' }}>Native</TableCell>
                            <TableCell style={{ width: '10%' }}>Asian</TableCell>
                            <TableCell style={{ width: '10%' }}>Hawaiian</TableCell>
                            <TableCell style={{ width: '10%' }}>NSLP</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                value={this.state.demographics.age_0_3}
                                onChange={(event) => this.setDetailsDemographics(event, 'age_0_3')}
                            >
                            </Input>%</TableCell>
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                value={this.state.demographics.age_4_7}
                                onChange={(event) => this.setDetailsDemographics(event, 'age_4_7')}
                            >
                            </Input>%</TableCell>
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                value={this.state.demographics.age_8_12}
                                onChange={(event) => this.setDetailsDemographics(event, 'age_8_12')}
                            >
                            </Input>%</TableCell>
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                value={this.state.demographics.age_13_18}
                                onChange={(event) => this.setDetailsDemographics(event, 'age_13_18')}
                            >
                            </Input>%</TableCell>
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                value={this.state.demographics.white}
                                onChange={(event) => this.setDetailsDemographics(event, 'white')}
                            >
                            </Input>%</TableCell>
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                value={this.state.demographics.black_or_african_american}
                                onChange={(event) => this.setDetailsDemographics(event, 'black_or_african_american')}
                            >
                            </Input>%</TableCell>
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                label={"Demographics Ages 0-3"}
                                value={this.state.demographics.asian}
                                onChange={(event) => this.setDetailsDemographics(event, 'asian')}
                            >
                            </Input>%</TableCell>
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                label={"Demographics Ages 0-3"}
                                value={this.state.demographics.american_indian_or_alaska_native}
                                onChange={(event) => this.setDetailsDemographics(event, 'american_indian_or_alaska_native')}
                            >
                            </Input>%</TableCell>
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                label={"Demographics Ages 0-3"}
                                value={this.state.demographics.native_hawaiian_or_pacific_islander}
                                onChange={(event) => this.setDetailsDemographics(event, 'native_hawaiian_or_pacific_islander')}
                            >
                            </Input>%</TableCell>
                            <TableCell><Input
                                className={this.props.classes.smallInput}
                                label={"Demographics Ages 0-3"}
                                value={this.state.demographics.percentage_NSLP}
                                onChange={(event) => this.setDetailsDemographics(event, 'percentage_NSLP')}
                            >
                            </Input>%</TableCell>
                        </TableRow>
                    </>
                )
            }
        }

        return (
            <>
                {displayRow}
            </>

        )
    }
}

OrganizationsListPageItem.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (reduxStore) => ({
    reduxStore
})

const styledOrganizationsListPageItem = withStyles(styles)(OrganizationsListPageItem)

export default connect(mapStateToProps)(styledOrganizationsListPageItem)