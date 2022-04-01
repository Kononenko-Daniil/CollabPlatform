import React, {Component} from 'react';
import {ReactRouterDom} from 'react-router-dom';
import ProjectPageComponent from './component';
import axios from 'axios';

export class ProjectPageContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            project: {}
        }
    }

    componentDidMount(){
        axios({
            method: 'GET',
            url: 'https://localhost:7040/get-project-by-id',
            params: { projectId: this.state.id }
        }).then(
            res => {
                const project = res.data;
                console.log(project);
                this.setState({project: project});
            }
        )
        console.log(this.state.project);
    }

    render(){
        return (
            <ProjectPageComponent
                project={this.state.project}/>
        )
    }
}