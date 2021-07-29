import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  let AuthReducer = useSelector((state) => state.AuthReducer);
  return (
    <div className="navbar">
      <h2>my website</h2>
      <div className="NavLinks">
        {AuthReducer.isUser ? (
          <>
            <NavLink
              activeClassName="active_Navlink"
              className="NavLink"
              exact
              to="/TodosScreen"
            >
              posts
            </NavLink>
            <NavLink
              activeClassName="active_Navlink"
              className="NavLink"
              exact
              to="/Home"
            >
              Profile
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              activeClassName="active_Navlink"
              className="NavLink"
              exact
              to="/"
            >
              Login
            </NavLink>
            <NavLink
              activeClassName="active_Navlink"
              className="NavLink"
              exact
              to="/Register"
            >
              Register
            </NavLink>
            <NavLink
              activeClassName="active_Navlink"
              className="NavLink"
              exact
              to="/TodosScreen"
            >
              Posts
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
