import React from "react";
import PropTypes from "prop-types";

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white"
  }
};

const SidebarContent = props => {
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  return (
    <div style={styles.content}>
      <a href="home.html" style={styles.sidebarLink}>
        Home
      </a>
      <a href="wallet.html" style={styles.sidebarLink}>
        Wallet
      </a>
      <div style={styles.divider} />
      <a href="prefs.html" style={styles.sidebarLink}>
        Preferences
      </a>
    </div>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;
