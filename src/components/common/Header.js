import React from "react";
import { NavLink } from "react-router-dom";

function header() {
  const activeStyle = { color: "orange" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {"  | "}
      <NavLink to="/courses" activeStyle={activeStyle} exact>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle} exact>
        About
      </NavLink>
    </nav>
  );
}

export default header;
