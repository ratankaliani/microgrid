import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "react-sidebar";
import SidebarContent from "./sidebar_content";


const mql = window.matchMedia(`(min-width: 800px)`);

export default class SidebarView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: mql.matches,
      open: true
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
      open: true
    });
  }

  toggleOpen(ev) {
    this.setState({ open: !this.state.open });

    if (ev) {
      ev.preventDefault();
    }
  }

  render() {
    const sidebar = <SidebarContent />;

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen
    };

    return (
      <Sidebar {...sidebarProps}>
        <div>
          <b> Home </b>
        </div>
      </Sidebar>
    );
  }
}
