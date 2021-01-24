import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import { Grid, useTheme } from '@material-ui/core';
import { logoutUser } from '../redux/actions/authActions'
import { connect, useDispatch } from 'react-redux'
import Controls from './controls/Controls';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import logo from '../Images/hr.png'

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
        // backgroundColor: theme.palette.primary.main
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1, 3, 1, 3),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
}));
const drawerWidth = 240;

function Appbar({ handleDrawerToggle, logoutUser, ...props }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const onLogout = (e) => {
        e.preventDefault()
        logoutUser(props.history)
        dispatch({ type: 'CHANGE_THEME', payload: { mode: false } })
        localStorage.setItem("darkState", "light")
    }

    console.log(props.mode)

    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Grid
                        justify="space-between" // Add it here :)
                        alignItems="center"
                        container
                        spacing={24}
                    >
                        <Grid item style={{ display: 'flex', alignItems: "center" }}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon color={theme.palette.text.primary} />
                            </IconButton>
                            <img src={logo} style={{marginRight : '5px'}} width="40px" height="40px" alt=""/>
                            <Typography variant="h5" noWrap style={{ color: theme.palette.common.white }}>
                                HR Management
                            </Typography>
                        </Grid>

                        <Grid item>
                            {props.mode ? (
                                <IconButton onClick={() => {
                                    dispatch({ type: 'CHANGE_THEME', payload: { mode: false } })
                                    localStorage.setItem("darkState", "light")
                                }

                                } aria-label="delete">
                                    <Brightness4Icon style={{ fontSize: '27px', color: theme.palette.common.white }} />
                                </IconButton>
                            ) : (
                                    <IconButton onClick={() => {
                                        dispatch({ type: 'CHANGE_THEME', payload: { mode: true } })
                                        localStorage.setItem("darkState", "dark")
                                    }
                                    } aria-label="delete">
                                        <Brightness4OutlinedIcon style={{ fontSize: '27px', color: theme.palette.common.white }} />
                                    </IconButton>
                                )}
                            <Controls.Button
                                onClick={onLogout}
                                text="Logout"
                                // disableElevation
                                // disableFocusRipple
                                // disableRipple
                                style={{ borderColor: theme.palette.common.white, color: theme.palette.common.white }}
                                size="medium"
                                startIcon={<ExitToAppIcon style={{ color: theme.palette.common.white }} />}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        mode: state.theme.darkMode
    }
}

export default connect(mapStateToProps, { logoutUser })(withRouter(Appbar));
