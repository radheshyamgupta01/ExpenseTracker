import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Header.css";

import {useHistory} from "react-router-dom"

export default function Header() {
  const history= useHistory()
  const LogoutButton=()=>{
    localStorage.clear("token")
    history.push("./login")
  }
  return (
    <div className="header">
      <ul>
        
      
        <li>
          <NavLink to="/">SIGN UP</NavLink>
        </li>
        <li>
          <NavLink to="/login">LOGIN</NavLink>
        </li>
        <li>
          <NavLink to="/product">PRODUCT</NavLink>
        </li>
        <li>
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/changePassword">PROFILE</NavLink>
        </li>
        <li>
          <NavLink to="/logout" onClick={LogoutButton}>LOGOUT</NavLink>
        </li>
        <li>
          <NavLink to="/setting" >SETTING</NavLink>
        </li>
      </ul>
    </div>
  );
}
