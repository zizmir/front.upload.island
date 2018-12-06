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

class Bucket extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    this.getBucket();
  }
  getBuckets = async () => {
    const response = await fetch(
      `http://localhost:5000/api/users/${this.props.user.uuid}/buckets`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state)
      }
    );

    const json = await response.json();
  };

  render() {
    return <h1> Bucket</h1>;
  }
}

export default Bucket;
