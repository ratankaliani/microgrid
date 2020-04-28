import React from "react";
import PropTypes from "prop-types";

const styles = {
  sidebar: {
    width: 200,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#5598DF"
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "#131842"
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
