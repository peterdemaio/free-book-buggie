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

class ContactsListPageItem extends React.Component {

    state = {
        expanded: false,
        anchorEl: null,
        open: false,
        contact: {
            id: this.props.contact.id,
            contact_name: this.props.contact.contact_name,
            phone_number: this.props.contact.phone_number,
            phone_number_type: this.props.contact.phone_number_type,
            email: this.props.contact.email,
            notes: this.props.contact.notes,

        }
    }

    menuOpen = (event) => {
        console.log(`clicked the open button for ${this.props.contact.name}!`)
        this.setState({ expanded: !this.state.expanded })
    }

    edit = () => {
        console.log('ready to edit:', this.props.contact.name)
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }

    setDetails = (event, type) => {
        // This updates state with the details submitted
        this.setState({
            contact: {
                ...this.state.contact,
                [type]: event.target.value
            }
        })
        console.log('Ready to edit with', this.state.contact)
    }

    saveContact = () => {
        console.log('ready to save org with: ', this.state.contact)
        this.props.dispatch({
            type: 'EDIT_CONTACT',
            payload: this.state.contact
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
                        title={this.props.contact.contact_name} 
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
                                <span>Phone Number: {this.props.contact.phone_number} </span>
                                <span>({this.props.contact.phone_number_type})</span>
                            </div>
                            <div>
                                <span>Email: {this.props.contact.email} </span>
                            </div>

                            <div>
                                <span>Organization: {this.props.contact.name}</span>
                                <br></br>
                                <span>Notes: {this.props.contact.notes}</span>
                            </div>
                        </div>
                    </Collapse>
                </Card>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth = 'lg'
                >
                    <DialogTitle> Edit Contact</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Name: 
                            <Input
                                value= {this.state.contact.contact_name}
                                onChange={(event) => this.setDetails(event, 'contact_name')}
                            >
                            </Input>
                            Phone Number: 
                            <Input
                                value= {this.state.contact.phone_number}
                                onChange={(event) => this.setDetails(event, 'phone_number')}
                            >
                            </Input>
                            Type:
                            <Input
                                value= {this.state.contact.phone_number_type}
                                onChange={(event) => this.setDetails(event, 'phone_number_type')}
                            >
                            </Input>
                            <br></br>
                            Email: 
                            <Input
                                value= {this.state.contact.email}
                                onChange={(event) => this.setDetails(event, 'email')}
                            >
                            </Input>
                             <br></br>
                            Notes: 
                            <Input
                                value= {this.state.contact.notes}
                                onChange={(event) => this.setDetails(event, 'notes')}
                            >
                            </Input>
                            <br></br>
                            <br></br>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.saveContact}    
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

ContactsListPageItem.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (reduxStore) => ({
    reduxStore
})

const styledContactsListPageItem = withStyles(styles)(ContactsListPageItem)

export default connect(mapStateToProps)(styledContactsListPageItem)