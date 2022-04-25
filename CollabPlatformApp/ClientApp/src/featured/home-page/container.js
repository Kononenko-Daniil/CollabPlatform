import React, { Component } from 'react';
import HomePageComponent from './component';
import axios from 'axios';

export class HomePageContainer extends Component {
  static displayName = HomePageContainer.name;
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
        url: "https://localhost:7040/projects/get-projects",
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
        url: 'https://localhost:7040/projects/delete-project',
        params: { projectId: projectId },
        withCredentials: true
    }).then(res => {
      this.getProjects();
    });
  }

  render () {
    return (
      <div>
        <HomePageComponent 
          projects = {this.state.projects}
          OnDeleteProjectClick = {this.OnDeleteProjectClick}
          />
      </div>
    );
  }
}