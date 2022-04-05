import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './featured/Layout';
import {HomePageContainer} from './featured/home-page/container';
import { ProjectPageContainer } from './featured/project-page/container';
import './webStyle.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={HomePageContainer} />
        <Route exact path='/projects/:id' component={ProjectPageContainer} />
      </Layout>
    );
  }
}
