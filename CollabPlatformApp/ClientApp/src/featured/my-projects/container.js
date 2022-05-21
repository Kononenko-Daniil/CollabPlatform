import React, { Component } from 'react';
import MyProjectsComponent from './component';
import axios from 'axios';
import constants from '../../Constants';
import Service from '../../Service';

export class MyProjectsContainer extends Component {
  static displayName = MyProjectsContainer.name;
  constructor(props){
      super(props);
      this.state = {
        projects: [],
        userName: this.props.userName
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
        params: {userName: this.state.userName},
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
        <MyProjectsComponent 
          projects = {this.state.projects}
          OnDeleteProjectClick = {this.OnDeleteProjectClick}
          />
      </div>
    );
  }
}