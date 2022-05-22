import React, { Component } from 'react';
import FooterComponent from './static-components/footer/component';

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
