import React from "react";
import Sidebar from "react-sidebar";
import SidebarContent from "./sidebar_content";


const mql = window.matchMedia(`(min-width: 1000px)`);

export default class SidebarView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: mql.matches,
      open: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  mediaQueryChanged() {
    this.setState({
      docked: mql.matches,
      open: false
    });
  }

  toggleOpen(ev) {
    this.setState({ open: !this.state.open });

    if (ev) {
      ev.preventDefault();
    }
  }

  render() {
    const sidebar = <SidebarContent 
      username={this.props.username} 
      selected={this.props.selected}
      onLoggedOut={this.props.onLoggedOut}
    />;

    const sidebarProps = {
      sidebar,
      children: <div></div>,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
      defaultSidebarWidth: 300,
      styles: {sidebar: {zIndex: 1}}
    };

    return (
      <Sidebar {...sidebarProps} />
    );
  }
}
