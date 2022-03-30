import React, { Component } from 'react';
import HomePageComponent from './component';
import axios from 'axios';

export class HomePageContainer extends Component {
  static displayName = HomePageContainer.name;
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
    console.log("delete");
      // axios.delete("");
      // axios({
      //     method: 'DELETE',
      //     url: 'https://localhost:7040/delete-project',
      //     params: { projectId: projectId }
      // });
      // window.location.reload();
  }

  render () {
    return (
      <div>
        <HomePageComponent 
          projects = {this.state.projects}
          OnDeleteProjectClick = {this.OnDeleteProjectClick.bind(this)}
          />
      </div>
    );
  }
}