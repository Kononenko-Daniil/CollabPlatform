import React, { Component } from 'react';
import {MyProjectsComponentFirstVariant, MyProjectsComponentSecondVariant} from './component';
import axios from 'axios';
import constants from '../../Constants';
import Service from '../../Service';

export class MyProjectsContainer extends Component {
  static displayName = MyProjectsContainer.name;
  constructor(props){
      super(props);
      this.state = {
        projects: []
      }

      this.OnDeleteProjectClick = this.OnDeleteProjectClick.bind(this);
  }
  
  componentDidMount(){
      this.getProjects();
      Service.CheckCookies();
  }

  getProjects(){
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      axios({
        method: 'GET',
        url: constants.apiPort + '/projects/get-projects-public',
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
        <MyProjectsComponentSecondVariant 
          projects = {this.state.projects}
          OnDeleteProjectClick = {this.OnDeleteProjectClick}
          />
      </div>
    );
  }
}