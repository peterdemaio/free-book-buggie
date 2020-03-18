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
}
    from '@material-ui/core';


const styles = theme => ({
    card: {
        justify: 'flex-start',
        minWidth: '600px',
        maxWidth: '600px',
        padding: '10px',
        margin: '12px',
        textAlign: 'center',
    },
    header: {
        color: '#ffffff',
        background: 'linear-gradient(45deg, #40C445 30%, #14771B 90%)',
        fontSize: '36px'
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
        width: '400px'
    },
    dropdown: {

    }
})

class OrganizationsListPageItem extends React.Component {

    state = {
        expanded: false,
        open: false,
        address: {
            id: this.props.org.id,
            url: this.props.org.url,
            logo: this.props.org.logo,
            address_number: this.props.org.address_number,
            address_street: this.props.org.address_street,
            address_unit: this.props.org.address_unit,
            city: this.props.org.city,
            state: this.props.org.state,
            zip: this.props.org.zip,
            county_id: this.props.org.county_id,
            notes: this.props.org.notes || ''
        }
    }

    menuOpen = (event) => {
        console.log(`clicked the open button for ${this.props.org.name}!`)
        this.setState({ expanded: !this.state.expanded })
    }

    edit = () => {
        console.log('ready to edit:', this.props.org.org_name)
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    setDetails = (event, type) => {
        // This updates state with the details submitted
        this.setState({
            address: {
                ...this.state.address,
                [type]: event.target.value
            }
        })
        console.log('Ready to edit with', this.state.address)
    }

    saveOrg = () => {
        console.log('ready to save org with: ', this.state.address)
        this.props.dispatch({
            type: 'EDIT_ORGANIZATION',
            payload: this.state.address
        })
        this.setState({
            ...this.state,
            open: false
        })
    }

    render() {
        return (
            <Grid item>
                <Card className={this.props.classes.card}>

                    <CardHeader
                        className={this.props.classes.header}
                        disableTypography={true}

                        avatar={
                                <div className={this.props.classes.avatar} onClick={() => window.open(this.props.org.url)}>
                                    <Avatar
                                        alt={this.props.org.org_name}
                                        src={this.props.org.logo}

                                    /></div>
                        }

                        title={this.props.org.org_name}
                        // fontSize={36}                  
                        action={
                            <div>
                                <IconButton
                                    className={`this.props.classes.expand, {
                                        [this.props.classes.expandOpen]: this.state.expanded,
                                    }`}
                                    aria-label="More"
                                    aria-haspopup="true"
                                    onClick={this.menuOpen}
                                >
                                    <ExpandMoreIcon className={this.props.classes.icon} />
                                </IconButton>
                            </div>
                        }>
                    </CardHeader>
                <Collapse className={this.props.classes.content} in={this.state.expanded} timeout="auto" unmountOnExit>
                    <div onClick={this.edit}>
                        <div className={this.props.classes.underline}>
                            Address:
                                <br></br>
                            <br></br>
                            <span>{this.props.org.address_number} </span>
                            <span>{this.props.org.address_street} </span>
                            {this.props.org.address_unit}
                        </div>
                        <div className={this.props.classes.underline}>
                            <span>{this.props.org.city} </span>
                            <span>{this.props.org.state} </span>
                            <span>{this.props.org.zip} </span>
                        </div>
                        <div className={this.props.classes.underline}>
                            <span>County: {this.props.org.county_name} </span>
                        </div>
                        <br></br>
                        <br></br>
                        <div className={this.props.classes.underline}>
                            <span>Notes: {this.props.org.notes}</span>
                        </div>

                    </div>
                </Collapse>
                </Card>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                maxWidth='lg'
            >
                <DialogTitle> Edit Organization</DialogTitle>
                <div>
                <DialogContent>
                    <DialogContentText>
                        Organization URL:
                            <Input
                            className={this.props.classes.wideInput}
                            value={this.state.address.url}
                            onChange={(event) => this.setDetails(event, 'url')}
                        ></Input>
                        <br></br>
                            Organization Logo Link:
                            <Input
                            className={this.props.classes.wideInput}
                            value={this.state.address.logo}
                            onChange={(event) => this.setDetails(event, 'logo')}
                        ></Input>
                        <br></br>
                            Number:
                            <Input
                            value={this.state.address.address_number}
                            onChange={(event) => this.setDetails(event, 'address_number')}
                        >
                        </Input>
                            Street:
                        <Input
                            value={this.state.address.address_street}
                            onChange={(event) => this.setDetails(event, 'address_street')}
                        >
                        </Input>
                            Unit:
                            <Input
                            value={this.state.address.address_unit}
                            onChange={(event) => this.setDetails(event, 'address_unit')}
                        >
                        </Input>
                        <br></br>
                            City:
                            <Input
                            value={this.state.address.city}
                            onChange={(event) => this.setDetails(event, 'city')}
                        >
                        </Input>
                            State:
                            <Input
                            value={this.state.address.state}
                            onChange={(event) => this.setDetails(event, 'state')}
                        >
                        </Input>
                            Zip:
                        <Input
                            value={this.state.address.zip}
                            onChange={(event) => this.setDetails(event, 'zip')}
                        >
                        </Input>
                        <span className={this.props.classes.dropdown}>County:  </span>
                            <FormControl >
                                <Select
                                    defaultValue = {this.props.org.county_id}
                                    native
                                    className={this.props.classes.dropdownItem}
                                    onChange={(event) => this.setDetails(event, 'county_id')}>
                                    {this.props.reduxStore.counties.map(county =>
                                        <option key={county.county_id} value={county.county_id} className={this.props.classes.dropdownMenu}>{county.county_name}</option>
                                    )}
                                </Select>
                            </FormControl>
                        <br></br>
                            Notes:
                            <Input
                            value={this.state.address.notes}
                            onChange={(event) => this.setDetails(event, 'notes')}
                        >
                        </Input>
                        <br></br>
                        <br></br>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.saveOrg}
                        >
                            Save Details
                            </Button>
                    </DialogContentText>
                </DialogContent>
                </div>
            </Dialog>
            </Grid >

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