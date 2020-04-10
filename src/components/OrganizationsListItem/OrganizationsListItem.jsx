import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    withStyles,
    Avatar,
    Button,
    Card,
    CardHeader,
    Collapse,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Input,
    Grid,
    FormControl,
    Select,
    TextField
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
        expanded: false,
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
            notes: this.props.org.notes || '',
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


    menuOpen = (event) => {
        this.setState({ expanded: !this.state.expanded })
    }

    edit = () => {
        this.setState({ open: !this.state.open })
    }

    handleClose = () => {
        this.setState({ open: false })
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
            open: false
        })
    }

    render() {
        let org = this.props.org
        let displayRow

        {
            if (this.state.open === false) {
                displayRow = (
                    <TableRow key={org.id} className={this.props.classes.row}>
                        <TableCell style={{ fontSize: '18px' }}>{org.org_name}</TableCell>
                        <TableCell style={{ fontSize: '18px', width: '200px' }}>{org.address_number} {org.address_street} {org.address_unit}</TableCell>
                        <TableCell style={{ fontSize: '18px', width: '50px' }}>{org.city}</TableCell>
                        <TableCell style={{ fontSize: '18px', maxWidth: '20px' }}>{org.state}</TableCell>
                        <TableCell style={{ fontSize: '18px' }}>{org.zip}</TableCell>
                        <TableCell style={{ fontSize: '18px' }}>{org.county_name}</TableCell>
                        <TableCell style={{ fontSize: '12px', width: '150px' }}>{org.notes}</TableCell>
                        <TableCell><Button onClick={this.edit} variant="contained" size="small" color="primary">Edit</Button></TableCell>
                        <TableCell><Button variant="contained" size="small" color="secondary">Delete</Button></TableCell>
                    </TableRow >
                )
            } else {
                displayRow = (
                    < TableRow key={org.id} className={this.props.classes.row} >
                        <TableCell style={{ fontSize: '18px' }}>
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
                )
            }
        }

        return (
            <>
                {displayRow}
            </>
            // <Grid item>
            //     <Card className={this.props.classes.card}>

            //         <CardHeader
            //             className={this.props.classes.header}
            //             disableTypography={true}

            //             avatar={
            //                 <div className={this.props.classes.avatar} onClick={() => window.open(this.props.org.url)}>
            //                     <Avatar
            //                         alt={this.props.org.org_name}
            //                         src={this.props.org.logo}

            //                     /></div>
            //             }

            //             title={this.props.org.org_name}
            //             // fontSize={36}                  
            //             action={
            //                 <div>
            //                     <IconButton
            //                         className={`this.props.classes.expand, {
            //                             [this.props.classes.expandOpen]: this.state.expanded,
            //                         }`}
            //                         aria-label="More"
            //                         aria-haspopup="true"
            //                         onClick={this.menuOpen}
            //                     >
            //                         <ExpandMoreIcon className={this.props.classes.icon} />
            //                     </IconButton>
            //                 </div>
            //             }>
            //         </CardHeader>
            //         <Collapse className={this.props.classes.content} in={this.state.expanded} timeout="auto" unmountOnExit>
            //             <div onClick={this.edit}>
            //                 <div className={this.props.classes.underline}>
            //                     <div>Address:</div>
            //                     <br></br>
            //                     <br></br>
            //                     <span>{this.props.org.address_number} </span>
            //                     <span>{this.props.org.address_street} </span>
            //                     {this.props.org.address_unit}
            //                 </div>
            //                 <div className={this.props.classes.underline}>
            //                     <span>{this.props.org.city} </span>
            //                     <span>{this.props.org.state} </span>
            //                     <span>{this.props.org.zip} </span>
            //                 </div>
            //                 <div className={this.props.classes.underline}>
            //                     <span>County: {this.props.org.county_name} </span>
            //                 </div>
            //                 <br></br>
            //                 <br></br>
            //                 <div className={this.props.classes.underline}>
            //                     <span>Notes: {this.props.org.notes}</span>
            //                 </div>

            //             </div>
            //         </Collapse>
            //     </Card>
            //     <Dialog
            //         open={this.state.open}
            //         onClose={this.handleClose}
            //         maxWidth='lg'
            //     >
            //         <DialogTitle> Edit Organization</DialogTitle>
            //         <div>
            //             <DialogContent>
            //                 <DialogContentText>
            //                     <div>Organization URL:{'  '}</div>
            //                     <Input
            //                         className={this.props.classes.wideInput}
            //                         value={this.state.address.url}
            //                         onChange={(event) => this.setDetailsAddress(event, 'url')}
            //                     ></Input>
            //                     <br></br>
            //                 <div>Organization Logo Link:{'  '}</div>
            //                     <Input
            //                         className={this.props.classes.wideInput}
            //                         value={this.state.address.logo}
            //                         onChange={(event) => this.setDetailsAddress(event, 'logo')}
            //                     ></Input>
            //                     <br></br>
            //                 <div>Number:{'  '}
            //                     <Input
            //                         className={this.props.classes.streetNumberInput}
            //                         value={this.state.address.address_number}
            //                         onChange={(event) => this.setDetailsAddress(event, 'address_number')}
            //                     >
            //                     </Input></div>
            //                 <div>Street:{'  '}
            //                     <Input
            //                         className={this.props.classes.streetNameInput}
            //                         value={this.state.address.address_street}
            //                         onChange={(event) => this.setDetailsAddress(event, 'address_street')}
            //                     >
            //                     </Input></div>
            //                 <div>Unit:{'  '}
            //                     <Input
            //                         className={this.props.classes.streetNumberInput}
            //                         value={this.state.address.address_unit}
            //                         onChange={(event) => this.setDetailsAddress(event, 'address_unit')}
            //                     >
            //                     </Input></div>
            //                     <br></br>
            //                 City:{'  '}
            //                     <Input
            //                         value={this.state.address.city}
            //                         onChange={(event) => this.setDetailsAddress(event, 'city')}
            //                     >
            //                     </Input>
            //                 State:{'  '}
            //                     <Input
            //                         className={this.props.classes.streetNumberInput}
            //                         value={this.state.address.state}
            //                         onChange={(event) => this.setDetailsAddress(event, 'state')}
            //                     >
            //                     </Input>
            //                 Zip:{'  '}
            //                     <Input
            //                         className={this.props.classes.streetNumberInput}
            //                         value={this.state.address.zip}
            //                         onChange={(event) => this.setDetailsAddress(event, 'zip')}
            //                     >
            //                     </Input>
            //                     <span className={this.props.classes.dropdown}>County:  </span>
            //                     <FormControl >
            //                         <Select
            //                             defaultValue={this.Companies}
            //                             native className={this.props.classes.dropdownItem}
            //                             onChange={(event) => this.setDetailsAddress(event, 'county_id')}>
            //                             {this.props.reduxStore.counties.map(county =>
            //                                 <option key={county.county_id} value={county.county_id} className={this.props.classes.dropdownMenu}>{county.county_name}</option>
            //                             )}
            //                         </Select>
            //                     </FormControl>
            //                     <br></br>
            //                     <h3>Demographics Information:</h3>
            //                     <h4>Age breakdown by percentage:</h4>
            //             0-3:{'  '}
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.age_0_3}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'age_0_3')}
            //                     >
            //                     </Input>%
            //                     <br></br>
            //             4-7:{'  '}
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.age_4_7}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'age_4_7')}
            //                     >
            //                     </Input>%
            //                     <br></br>
            //             8-12:{'  '}
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.age_8_12}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'age_8_12')}
            //                     >
            //                     </Input>%
            //                     <br></br>
            //             13-18:{'  '}
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.age_13_18}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'age_13_18')}
            //                     >
            //                     </Input>%
            //             <br></br>
            //                     <br></br>
            //                     <h4>Racial Breakdown by percentage:</h4>
            //             White{' '}
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.white}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'white')}
            //                     >
            //                     </Input>%<br></br>
            //             Black or African American{' '}
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.black_or_african_american}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'black_or_african_american')}
            //                     >
            //                     </Input>%<br></br>
            //             American Indian or Alaska Native{' '}
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.american_indian_or_alaska_native}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'american_indian_or_alaska_native')}
            //                     >
            //                     </Input>%<br></br>
            //             Asian{' '}
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.asian}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'asian')}
            //                     >
            //                     </Input>%<br></br>
            //             Native Hawaiian or Pacific Islander{' '}
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.native_hawaiian_or_pacific_islander}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'native_hawaiian_or_pacific_islander')}
            //                     >
            //                     </Input>%<br></br>
            //                     <h4>Pencentage of kids who qualify for free or reduced school lunch:</h4>
            //                     <Input
            //                         className={this.props.classes.smallInput}
            //                         value={this.state.demographics.percentage_NSLP}
            //                         onChange={(event) => this.setDetailsDemographics(event, 'percentage_NSLP')}
            //                     >
            //                     </Input>%
            //             <br></br>
            //                     <br></br>
            //                 Notes:
            //                 <TextField
            //                         multiline
            //                         rows="4"
            //                         className={this.props.classes.notes}
            //                         value={this.state.address.notes}
            //                         onChange={(event) => this.setDetailsAddress(event, 'notes')}
            //                     >
            //                     </TextField>
            //                     <br></br>
            //                     <br></br>
            //                     <Button
            //                         variant="contained"
            //                         color="primary"
            //                         onClick={this.saveOrg}
            //                     >
            //                         Save Details
            //                 </Button>
            //                 </DialogContentText>
            //             </DialogContent>
            //         </div>
            //     </Dialog>
            // </Grid >

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