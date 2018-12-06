import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import jwt from "jsonwebtoken";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Bucket from "./pages/Bucket";

const APP_NAME = "myS3.app";

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      user: null,
      buckets: []
    };

    this.checkUser();
  }

  checkUser = () => {
    const meta = JSON.parse(localStorage.getItem(APP_NAME));
    if (meta) {
      const decoded = jwt.decode(meta.token);
      // JSON = CHECK WITH SERVER IF NO EXPIRATION
      // this.handleUser(json.data.user, json.data.meta);
    }
  };

  handleUser = (user, meta) => {
    localStorage.setItem(APP_NAME, JSON.stringify(meta));

    this.setState({
      isConnected: true,
      user
    });
  };

  logout = () => {
    localStorage.removeItem(APP_NAME);
    this.setState({
      isConnected: false,
      user: null
    });

    // REDIRECT
  };

  render() {
    const { user, isConnected } = this.state;

    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/signIn">SignIn</Link>
              </li>
              <li>
                <Link to="/signUp">SignUp</Link>
              </li>
              <li>
                <a href="#" onClick={this.logout}>
                  SignOut
                </a>
              </li>
              {isConnected && (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/bucket">Buckets</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <Route exact path="/" component={Home} />
          <Route
            path="/signIn"
            render={props => {
              return <SignIn {...props} handleUser={this.handleUser} />;
            }}
          />
          <Route
            path="/signUp"
            render={props => {
              return <SignUp {...props} handleUser={this.handleUser} />;
            }}
          />
          {isConnected && (
            <>
              <Route
                path="/dashboard"
                render={props => {
                  return <Dashboard {...props} nickname={user.nickname} />;
                }}
              />
              <Route
                path="/bucket"
                render={props => {
                  return <Bucket component={Bucket} />;
                }}
              />
            </>
          )}
        </div>
      </Router>
    );
  }
}

export default AppRouter;
