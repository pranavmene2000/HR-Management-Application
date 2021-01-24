import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import { loginUser } from '../../redux/actions/authActions'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        StackHack 2.0
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.airlines.iata.org/sites/default/files/event_images/web_financial_health_iStock-517460304.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    alert(`
      Sample Data ==>

      Admin credentials : 
      emailId : admin@gmail.com
      password : admin1234

      Employee credentials : 
      emailId : employee@gmail.com
      password : employee1234
    `)
  }, [])

  const [emailId, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const condition = !emailId || !password

  const handleSubmit = (e) => {
    e.preventDefault()
    const datamain = {
      emailId,
      password
    }
    console.log(datamain)
    setPassword('')
    props.loginUser(datamain, props.history)
  }

  if (localStorage.jwt) {
    props.history.push('/')
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography style={{ color: theme.palette.text.primary }} component="h1" variant="h5">
            Log In
          </Typography>
          {props?.errors?.length !== 0 && props.errors[0].msg === "Invalid Credentials" ? (
            <Alert style={{ width: '100%', marginTop: '10px' }} severity="error">T{props.errors[0]?.msg}</Alert>
          ) : null}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="emailId"
              label="Email Address"
              name="emailId"
              autoComplete="emailId"
              autoFocus
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              error={props?.errors?.length !== 0 && props.errors.filter(err => err.param === "emailId")[0]?.msg === "Please include a valid email"}
              helperText={props?.errors?.length !== 0 && props.errors.filter(err => err.param === "emailId") && props.errors.filter(err => err.param === "emailId")[0]?.msg}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={(props?.errors?.length !== 0) && (props.errors.filter(err => err.param === "password")[0]?.msg === "Password length should be 6 digits" || props.errors.filter(err => err.param === "password")[0]?.msg === "Please, enter valid password")}
              helperText={props?.errors?.length !== 0 && props.errors.map(err => err.param === "password") && props.errors.filter(err => err.param === "password")[0]?.msg}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={condition}
              disableElevation
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors.Errors
  }
}

export default connect(mapStateToProps, { loginUser })(withRouter(Login))