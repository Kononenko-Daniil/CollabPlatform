import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './featured/Layout';
import { HomePageContainer } from './featured/home-page/container';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={HomePageContainer} />
      </Layout>
    );
  }
}
