import React from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Paper, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    card: {
        justify: 'flex-start',
        minWidth: '200px',
        maxWidth: '600px',
        padding: '10px',
        margin: '12px',
        //fontSize: '36px',
        textAlign: 'center',
        // backgroundColor: '#40C445'
        background: 'linear-gradient(45deg, #40C445 30%, #14771B 90%)'
    },
    header: {
        // backgroundColor: '#14771B',
        color: '#ffffff',
        background: 'linear-gradient(45deg, #40C445 30%, #14771B 90%)',
        fontSize: '36px'
    },
    content: {
        color: '#ffffff',
        textAlign: 'left',
        '&:hover': {
            cursor: 'zoom-in'
        },
        fontSize: '26px',
    },
    expand: {
        color: '#ffffff',
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
    }
})

class OrganizationsListPageItem extends React.Component {

    state = {
        expanded: false,
        anchorEl: null,
        open: false,
        address: {
            id: this.props.org.id,
            address_number: this.props.org.address_number,
            address_street: this.props.org.address_street,
            address_unit: this.props.org.address_unit,
            city: this.props.org.city,
            state: this.props.org.state,
            zip: this.props.org.zip,
            county: this.props.org.county,
            notes: this.props.org.notes || ''
        }
    }

    menuOpen = (event) => {
        console.log(`clicked the open button for ${this.props.org.name}!`)
        this.setState({ expanded: !this.state.expanded })
    }

    edit = () => {
        console.log('ready to edit:', this.props.org.name)
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
                            <Avatar
                                alt={this.props.org.name}
                                src={this.props.org.logo}
                            />
                        }
                        
                        title={this.props.org.name} 
                        // fontSize={36}                  
                        action={
                            <IconButton
                                className={this.props.classes.expand, {
                                    [this.props.classes.expandOpen]: this.state.expanded,
                                }}
                                aria-label="More"
                                aria-haspopup="true"
                                onClick={this.menuOpen}
                            >
                                <ExpandMoreIcon className={this.props.classes.icon} />
                            </IconButton>
                        }>
                    </CardHeader>
                    <Collapse className={this.props.classes.content} in={this.state.expanded} timeout="auto" unmountOnExit>
                        <div onClick={this.edit}>
                            <div>
                                Address:
                                <br></br>
                                <br></br>
                                <span>{this.props.org.address_number} </span>
                                <span>{this.props.org.address_street} </span>
                                {this.props.org.address_unit}
                            </div>
                            <div>
                                <span>{this.props.org.city} </span>
                                <span>{this.props.org.state} </span>
                                <span>{this.props.org.zip} </span>
                            </div>
                            <div>
                                <span>County: {this.props.org.county} </span>
                            </div>
                            <br></br>
                            <br></br>
                            <div>
                                <span>Notes: {this.props.org.notes}</span>
                            </div>

                        </div>
                    </Collapse>
                </Card>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth = 'lg'
                >
                    <DialogTitle> Edit Organization</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Number: 
                            <Input
                                value= {this.state.address.address_number}
                                onChange={(event) => this.setDetails(event, 'address_number')}
                            >
                            </Input>
                            Street: 
                            <Input
                                value= {this.state.address.address_street}
                                onChange={(event) => this.setDetails(event, 'address_street')}
                            >
                            </Input>
                            Unit: 
                            <Input
                                value= {this.state.address.address_unit}
                                onChange={(event) => this.setDetails(event, 'address_unit')}
                            >
                            </Input>
                            <br></br>
                            City: 
                            <Input
                                value= {this.state.address.city}
                                onChange={(event) => this.setDetails(event, 'city')}
                            >
                            </Input>
                            State: 
                            <Input
                                value= {this.state.address.state}
                                onChange={(event) => this.setDetails(event, 'state')}
                            >
                            </Input>
                            Zip: 
                            <Input
                                value= {this.state.address.zip}
                                onChange={(event) => this.setDetails(event, 'zip')}
                            >
                            </Input>
                            County: 
                            <Input
                                value= {this.state.address.county}
                                onChange={(event) => this.setDetails(event, 'county')}
                            >
                            </Input>
                            <br></br>
                            Notes: 
                            <Input
                                value= {this.state.address.notes}
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
                </Dialog>
            </Grid>

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