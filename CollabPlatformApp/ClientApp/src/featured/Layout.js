import React, { Component } from 'react';
import { NavbarContainer } from './static-components/navbar/container';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
