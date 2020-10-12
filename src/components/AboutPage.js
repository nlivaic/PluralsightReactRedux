import React, { Component } from "react";
import { Link } from "react-router-dom";

class AboutPage extends Component {
  render() {
    return (
      <>
        <h1>About</h1>
        <Link to="/">Home</Link>
      </>
    );
  }
}

export default AboutPage;
