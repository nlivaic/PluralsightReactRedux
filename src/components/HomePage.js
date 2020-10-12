import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="jumbotron">
        <h1 className="">Pluralsight Administration</h1>
        <p>React and Router for web apps</p>
        <Link className="btn btn-primary" to="about">
          About
        </Link>
      </div>
    </>
  );
};

export default HomePage;
