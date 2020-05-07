import React from "react";
import PropTypes from "prop-types";
import "./Sidebar.css"

const styles = {
  sidebar: {
    width: 200,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    color: "#FFFFFF",
    fontFamily: "Apercu-Medium",
    textDecoration: "none",
    width: 200
  },
  content: {
    padding: "16px",
    paddingTop: "32px",
    height: "100%",
    backgroundColor: "#131842",
    borderRight: "solid white 2px"
  }
};

const SidebarContent = props => {
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  return (
    <div style={styles.content}>
      <div className="sidebar-link">
        <p className="sidebar-link-text" style={{fontSize: 32}}>{props.username.toUpperCase()}</p>
      </div>
      <a href="/" className="sidebar-link">
        <p className="sidebar-link-text">{props.selected == "home" ? "HOME" : "Home"}</p>
      </a>
      <a href="/wallet" className="sidebar-link">
      <p className="sidebar-link-text">{props.selected == "wallet" ? "WALLET" : "Wallet"}</p>
      </a>
      <a href="/" onClick={(e) => {e.preventDefault(); console.log("IN HERE BB"); props.onLoggedOut()}} className="sidebar-link">
        <p className="sidebar-link-text">Log out</p>
      </a>
    </div>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;
