import React, { Component } from 'react';
import HomePageComponent from './component';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export class HomePageContainer extends Component {
  static displayName = HomePageContainer.name;
  constructor(props){
      super(props);
  }
  state ={
      projects: [],
      showCreateModal: false
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

  OnCreateProjectClick = () => {
      this.setState({showCreateModal: true})
  }

  OnDeleteProjectClick = (projectId, projectName) => {
    const deleteProject = window.confirm("Are you sure you want to delete " + projectName);
    console.log(deleteProject);
    if(deleteProject){
      axios({
          method: 'DELETE',
          url: 'https://localhost:7040/delete-project',
          params: { projectId: projectId }
      }).then(res => {
        this.getProjects();
      });
    }
  }

  render () {
    return (
      <div>
        <HomePageComponent 
          projects = {this.state.projects}
          OnDeleteProjectClick = {this.OnDeleteProjectClick.bind(this)}
          showCreateModal={this.state.showCreateModal}
          OnCreateProjectClick={this.OnCreateProjectClick.bind(this)}
          />
      </div>
    );
  }
}

//export default withRouter(HomePageComponent);