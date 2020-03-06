import React from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Paper } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';


const styles = theme => ({
    header : {
        backgroundColor: '#808080',
        color: '#ffff',
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
    }
})

class OrganizationsListPageItem extends React.Component {

    state = {
        expanded: false,
        anchorEl: null
    }

    menuOpen = event => {
        console.log(`clicked the open button for ${this.props.org.name}!`)
        this.setState({ expanded: !this.state.expanded})
    }
    render() {
        return (
            <Grid item>
                <Card className={this.props.classes.header}>
                    <CardHeader
                        avatar={
                            <Avatar 
                                alt={this.props.org.name}
                                src={this.props.org.logo}
                            />
                        }
                        title={this.props.org.name}
                        action= {
                             <IconButton
                             className={this.props.classes.expand, {
                                [this.props.classes.expandOpen]: this.state.expanded,
                            }}
                             aria-label="More"
                             aria-haspopup="true"
                             onClick={this.menuOpen}
                         >
                             <ExpandMoreIcon />
                         </IconButton>
                        }>
                    </CardHeader>

                </Card>
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