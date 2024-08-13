import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";


const NavigationComponent = (props) => {
  console.log('NavigationComponent props:', props);
  if (typeof props.openModal !== 'function') {
    console.error('openModal is not defined or not a function');
    return null;
}

  const dynamicLink = (route, linkText) => {
    return(
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">{linkText}</NavLink>
      </div>
    );
  };
  const handleSignOut = () => {
    localStorage.removeItem('token');
    props.history.push("/");
    props.handleSuccessfulLogout();
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink exact to="/store" activeClassName="nav-link-active">Store</NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/about-me" activeClassName="nav-link-active">About</NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>
        </div>
        {props.loggedInStatus === "LOGGED_IN" ? (dynamicLink("/portfolio-manager", "Porfolio Manager")) : null }

        {false ? <button>Add Blog</button> : null}
      </div>
      <div className="right-side">
        MARIA DEL MAR ALONSO
        {props.loggedInStatus === "LOGGED_IN" ? (
          <a onClick={handleSignOut}>
            <FontAwesomeIcon icon="sign-out-alt" />
          </a>) : (
            <a onClick={props.openModal} className="nav-icon">
              <FontAwesomeIcon icon="door-open" />
            </a>
          )} 
      </div>
    </div>
  );
}


export default withRouter(NavigationComponent);