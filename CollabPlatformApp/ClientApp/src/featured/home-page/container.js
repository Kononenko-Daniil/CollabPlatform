import React, { Component } from 'react';
import HomePageComponent from './component';

export class HomePageContainer extends Component {
  static displayName = HomePageContainer.name;

  render () {
    return (
      <div>
        <HomePageComponent/>
      </div>
    );
  }
}