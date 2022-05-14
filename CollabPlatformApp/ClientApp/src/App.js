import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './featured/Layout';
import { HomePageContainer } from './featured/home-page/container';
import { ProjectPageContainer } from './featured/project-page/container';
import { CreatePageContainer } from './featured/create-project-page/container';
import { SignUpPageContainer } from './featured/sign-up-page/container';
import { SignInPageContainer } from './featured/sign-in-page/container';
import { ViewAccountPageContainer } from './featured/view-account-page/container';
import './webStyle.css';
import './Constants';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={HomePageContainer} />
        <Route exact path='/projects/:id' component={ProjectPageContainer} />
        <Route exact path='/create-project' component={CreatePageContainer} />
        <Route exact path='/sign-up' component={SignUpPageContainer} />
        <Route exact path='/sign-in' component={SignInPageContainer} />
        <Route exact path='/accounts/:name' component={ViewAccountPageContainer} />
      </Layout>
    );
  }
}
