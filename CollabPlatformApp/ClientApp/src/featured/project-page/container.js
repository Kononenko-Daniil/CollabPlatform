import React, {Component} from 'react';
import {ReactRouterDom} from 'react-router-dom';
import ProjectPageComponent from './component';
import axios from 'axios';

export class ProjectPageContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            project: {},
            linkName: "",
            linkUrl: ""
        }

        this.handleLinkNameChange = this.handleLinkNameChange.bind(this);
        this.handleLinkUrlChange = this.handleLinkUrlChange.bind(this);
        this.handleLinkSubmit = this.handleLinkSubmit.bind(this);
    }

    handleLinkNameChange(event) {
        this.setState({linkName: event.target.value});
    }

    handleLinkUrlChange(event) {
        this.setState({linkUrl: event.target.value});
    }

    handleLinkSubmit(event) {
        const link = {
            id: "",
            name: this.state.linkName,
            projectId: "",
            url: this.state.linkUrl
        }
        console.log(link)
        axios({
            method: 'POST',
            url: 'https://localhost:7040/create-link',
            params: { projectId: this.state.id, linkName: this.state.linkName, linkUrl: this.state.linkUrl }
        });
        
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
        
    }

    render(){
        return (
            <ProjectPageComponent
                project={this.state.project}
                handleLinkNameChange={this.handleLinkNameChange}
                handleLinkUrlChange={this.handleLinkUrlChange}
                handleLinkSubmit={this.handleLinkSubmit}/>
        )
    }
}