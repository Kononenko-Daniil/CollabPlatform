import React, { Component } from 'react';
import {MyProjectsPageComponentFirstVariant, MyProjectsPageComponentSecondVariant} from './component';
import axios from 'axios';
import constants from '../../Constants';

export class MyProjectsPageContainer extends Component {
  static displayName = MyProjectsPageContainer.name;
  constructor(props){
      super(props);

      this.OnDeleteProjectClick = this.OnDeleteProjectClick.bind(this);
  }
  state ={
      projects: []
  }

  componentDidMount(){
      this.getProjects();
  }

  getProjects(){
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      axios({
        method: 'GET',
        url: constants.apiPort + '/projects/get-projects',
        withCredentials: true,
        config
      }).then(res => {
            const projects = res.data;
            this.setState({projects});
      })
  }

  OnDeleteProjectClick = (projectId) => {
    axios({
        method: 'DELETE',
        url: constants.apiPort + '/projects/delete-project',
        params: { projectId: projectId },
        withCredentials: true
    }).then(res => {
      this.getProjects();
    });
  }

  render () {
    return (
      <div>
        <MyProjectsPageComponentSecondVariant 
          projects = {this.state.projects}
          OnDeleteProjectClick = {this.OnDeleteProjectClick}
          />
      </div>
    );
  }
}