import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    withStyles,
    Button,
    Input,
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
    }
})

class ContactsListPageItem extends React.Component {

    state = {
        setOpen: false,
        edit: false,
        open: false,
        contact: {
            id: this.props.contact.id,
            contact_name: this.props.contact.contact_name,
            phone_number: this.props.contact.phone_number,
            phone_number_type: this.props.contact.phone_number_type,
            email: this.props.contact.email,
            notes: this.props.contact.notes,
            org_name: this.props.contact.org_name,
            org_id: this.props.contact.org_id

        }
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

    edit = () => {
        this.setState({ edit: !this.state.edit })
    }

    delete = () => {
        this.setState({
            setOpen: false
        })
        this.props.dispatch({
            type: 'DELETE_CONTACT',
            payload: this.state.contact
        })
    }

    setDetails = (event, type) => {
        // This updates state with the details submitted
        this.setState({
            contact: {
                ...this.state.contact,
                [type]: event.target.value
            }
        })
    }

    saveContact = () => {
        this.props.dispatch({
            type: 'EDIT_CONTACT',
            payload: this.state.contact
        })
        this.setState({
            ...this.state,
            edit: false
        })
    }

    render() {
        let contact = this.props.contact
        let displayRow

        {
            if (this.state.edit === false) {
                displayRow = (
                    <TableRow key={contact.id} className={this.props.classes.row}>
                        <TableCell >{contact.contact_name}</TableCell>
                        <TableCell >{contact.org_name}</TableCell>
                        {contact.phone_number_type ?
                            <TableCell >{contact.phone_number} ({contact.phone_number_type}) </TableCell> :
                            <TableCell >{contact.phone_number}</TableCell>}
                        <TableCell >{contact.email}</TableCell>
                        <TableCell >{contact.notes}</TableCell>
                        <TableCell><Button onClick={this.edit} variant="contained" size="small" color="primary">Edit</Button></TableCell>
                        <TableCell><Button onClick={this.handleClickOpen} variant="contained" size="small" color="secondary">Delete</Button></TableCell>
                        <Dialog
                            open={this.state.setOpen}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Are you sure you wish to delete this contact?"}</DialogTitle>
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
                    <TableRow key={contact.id} className={this.props.classes.row}>
                        <TableCell ><Input
                            value={this.state.contact.contact_name}
                            onChange={(event) => this.setDetails(event, 'contact_name')}
                        ></Input></TableCell>
                        <TableCell ><Input
                            value={this.state.contact.org_name}
                            onChange={(event) => this.setDetails(event, 'org_name')}
                        ></Input></TableCell>
                        <TableCell ><Input
                            value={this.state.contact.phone_number}
                            onChange={(event) => this.setDetails(event, 'phone_number')}
                            placeholder="number"
                        ></Input><Input
                            value={this.state.contact.phone_number_type}
                            onChange={(event) => this.setDetails(event, 'phone_number_type')}
                            placeholder="number type"
                        ></Input></TableCell>
                        <TableCell ><Input
                            value={this.state.contact.email}
                            onChange={(event) => this.setDetails(event, 'email')}
                            placeholder="email"
                        ></Input></TableCell>
                        <TableCell ><Input
                            value={this.state.contact.notes}
                            onChange={(event) => this.setDetails(event, 'notes')}
                            placeholder="notes"
                        ></Input></TableCell>
                        <TableCell><Button onClick={this.saveContact} variant="contained" size="small" color="primary">Save</Button></TableCell>
                        <TableCell><Button onClick={this.edit} variant="contained" size="small" color="secondary">Cancel</Button></TableCell>

                    </TableRow >
                )
            }
        }
        return (
            <>
                {displayRow}
            </>
            //         < Grid item >
            //             <Card className={this.props.classes.card}>
            //                 <CardHeader
            //                     className={this.props.classes.header}
            //                     disableTypography={true}
            //                     title={this.props.contact.contact_name}
            //                     // fontSize={36}                  
            //                     action={
            //                         <IconButton
            //                             className={`this.props.classes.expand, {
            //                         [this.props.classes.expandOpen]: this.state.expanded
            //                     }`}
            //                             aria-label="More"
            //                             aria-haspopup="true"
            //                             onClick={this.menuOpen}
            //                         >
            //                             <ExpandMoreIcon className={this.props.classes.icon} />
            //                         </IconButton>
            //                     }>
            //                 </CardHeader>
            //                 <Collapse className={this.props.classes.content} in={this.state.expanded} timeout="auto" unmountOnExit>
            //                     <div onClick={this.edit}>
            //                         <div>
            //                             <span className={this.props.classes.underline}>Phone Number: {this.props.contact.phone_number} ({this.props.contact.phone_number_type}) </span>
            //                         </div>
            //                         <div>
            //                             <span className={this.props.classes.underline}>Email: {this.props.contact.email} </span>
            //                         </div>

            //                         <div>
            //                             <span className={this.props.classes.underline}>Organization: {this.props.contact.org_name}</span>
            //                             <br></br>
            //                             <span>Notes: {this.props.contact.notes}</span>
            //                         </div>
            //                     </div>
            //                 </Collapse>
            //             </Card>
            //             <Dialog
            //                 open={this.state.open}
            //                 onClose={this.handleClose}
            //                 maxWidth='lg'
            //             >
            //                 <DialogTitle> Edit Contact</DialogTitle>
            //                 <DialogContent>
            //                     <DialogContentText>
            //                         Name:
            //                 <Input
            //                             value={this.state.contact.contact_name}
            //                             onChange={(event) => this.setDetails(event, 'contact_name')}
            //                         >
            //                         </Input>
            //                 Phone Number:
            //                 <Input
            //                             value={this.state.contact.phone_number}
            //                             onChange={(event) => this.setDetails(event, 'phone_number')}
            //                         >
            //                         </Input>
            //                 Type:
            //                 <Input
            //                             value={this.state.contact.phone_number_type}
            //                             onChange={(event) => this.setDetails(event, 'phone_number_type')}
            //                         >
            //                         </Input>
            //                         <br></br>
            //                 Email:
            //                 <Input
            //                             value={this.state.contact.email}
            //                             onChange={(event) => this.setDetails(event, 'email')}
            //                         >
            //                         </Input>
            //                         <br></br>
            //                 Notes:
            //                 <Input
            //                             value={this.state.contact.notes}
            //                             onChange={(event) => this.setDetails(event, 'notes')}
            //                         >
            //                         </Input>
            //                         <br></br>
            //                         <br></br>
            //                         <Button
            //                             variant="contained"
            //                             color="primary"
            //                             onClick={this.saveContact}
            //                         >
            //                             Save Details
            //                 </Button>
            //                     </DialogContentText>
            //                 </DialogContent>
            //             </Dialog>
            // </Grid >
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