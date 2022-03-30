import React, { Component } from 'react';
import { Container, Navbar } from 'reactstrap';
import { NavbarComponent } from './static-components/navbar';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavbarComponent />
        {this.props.children}
      </div>
    );
  }
}
