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
      axios.get("https://localhost:7040/get-projects", config)
        .then(res => {
            const projects = res.data;
            this.setState({projects});
      })
  }

  OnDeleteProjectClick = (projectId) => {
    axios({
        method: 'DELETE',
        url: 'https://localhost:7040/delete-project',
        params: { projectId: projectId }
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