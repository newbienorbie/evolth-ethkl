import React from "react";
import "./Sidebar.styles.css";
import { NavLink } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <BackButton />
      <div className='side-list'>
        <ul>
          <li>
            <NavLink
              to='/profile'
              activeClassName='active'
            >
              User Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/franchise'
              activeClassName='active'
            >
              Franchise List
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profile/transactions'
              activeClassName='active'
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profile/settings'
              activeClassName='active'
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
