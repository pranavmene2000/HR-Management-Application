import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Docs, routesAdmin, routesEmp } from './Routes';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom'
import { Collapse, Divider, ListItemIcon } from '@material-ui/core';
import Appbar from './Appbar';
import { connect } from 'react-redux';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.paper
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1, 3, 1, 3),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));
function Navbar(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    if (!localStorage.jwt) {
        props.history.push('/login')
    }

    const drawerAdmin = (
        <div>
            <List>
                {routesAdmin.map((route, index) => (
                    <ListItem
                        button
                        activeClassName="Mui-selected"
                        exact
                        component={NavLink}
                        to={route.path}
                        key={route.text}
                    >
                        <ListItemIcon>
                            {route.icon}
                        </ListItemIcon>
                        <ListItemText style={{ color: theme.palette.text.primary }} primary={route.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const drawerEmp = (
        <div>
            <List>
                {routesEmp.map((route, index) => (
                    <ListItem
                        button
                        activeClassName="Mui-selected"
                        exact
                        component={NavLink}
                        to={route.path}
                        key={route.text}
                    >
                        <ListItemIcon>
                            {route.icon}
                        </ListItemIcon>
                        <ListItemText style={{ color: theme.palette.text.primary }} primary={route.text} />
                    </ListItem>
                ))}
                <Divider style={{ margin: '15px 0px' }} />
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <AssignmentOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText style={{ color: theme.palette.text.primary }} primary="Docs" />
                    {open ?
                        <ExpandLess style={{ color: theme.palette.text.icon }} /> :
                        <ExpandMore style={{ color: theme.palette.text.icon }} />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                        {Docs.map((route, index) => (
                            <ListItem
                                button
                                className={classes.nested}
                                activeClassName="Mui-selected"
                                exact
                                component={NavLink}
                                to={route.path}
                                key={route.text}
                            >
                                <ListItemIcon>
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText style={{ color: theme.palette.text.primary }} primary={route.text} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
        </div>
    );



    return (
        <div className={classes.root}>
            <Appbar handleDrawerToggle={handleDrawerToggle} />

            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                            <CloseIcon />
                        </IconButton>
                        {props.auth.user.role === "Admin" ? drawerAdmin : drawerEmp}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar} />
                        {props.auth.user.role === "Admin" ? drawerAdmin : drawerEmp}
                    </Drawer>
                </Hidden>
            </nav>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    {props.auth.user.role === "Admin" ? (
                        routesAdmin.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main />}
                            />
                        ))
                    ) : (
                        [...routesEmp, ...Docs].map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main />}
                            />
                        ))
                    )}
                </Switch>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(withRouter(Navbar))