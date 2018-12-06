import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";

class SignUp extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
    password_confirmation: ""
  };

  register = async () => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });

    const json = await response.json();

    if (json.data) {
      this.props.handleUser(json.data.user, json.meta);
    }
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  isDisabled = () => {
    const { nickname, email, password, password_confirmation } = this.state;

    return (
      !nickname ||
      !email ||
      !password ||
      !password_confirmation ||
      password !== password_confirmation
    );
  };

  render() {
    const { classes } = this.props;

    const { nickname, email, password, password_confirmation } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="nickname">nickname</InputLabel>

              <Input
                id="nickname"
                name="nickname"
                autoComplete="nickname"
                value={nickname}
                onChange={this.handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">email</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="confirm-password">
                confirm password
              </InputLabel>
              <Input
                name="password_confirmation"
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                value={password_confirmation}
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              disabled={this.isDisabled()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.register}
            >
              Sign up
            </Button>
            <div>
              <Typography align="center" className={classes.link} component="a">
                Already registered ?
              </Typography>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  link: {
    color: "#3273dc",
    cursor: "pointer",
    textDecoration: "none",
    marginTop: 20
  }
});

export default withStyles(styles)(SignUp);
