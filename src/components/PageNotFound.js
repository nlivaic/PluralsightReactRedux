import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h2>Page Not Found</h2>
      <p>
        <Link to="/">Back To Home</Link>
      </p>
    </>
  );
};

export default PageNotFound;
