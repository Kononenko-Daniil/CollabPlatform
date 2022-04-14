import React, {Component} from 'react';
import ProjectPageComponent from './component';
import axios from 'axios';

export class ProjectPageContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            project: {},
            linkName: "",
            linkUrl: "",
            taskText: ""
        }

        this.OnDeleteTaskClick = this.OnDeleteTaskClick.bind(this);
        this.OnDeleteLinkClick = this.OnDeleteLinkClick.bind(this);

        this.handleLinkNameChange = this.handleLinkNameChange.bind(this);
        this.handleLinkUrlChange = this.handleLinkUrlChange.bind(this);
        this.handleLinkSubmit = this.handleLinkSubmit.bind(this);

        this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    }

    handleTaskTextChange(event) {
        this.setState({taskText: event.target.value});
    }

    handleTaskSubmit(event) {
        const task = {
            projectId: this.state.id,
            text: this.state.taskText
        };
        axios({
            method: 'POST',
            url: 'https://localhost:7040/tasks/create-task',
            data: task
        }).then(res=>{
            this.getProject();
        });
        this.setState({taskText: ""});
        event.preventDefault();
    }

    handleLinkNameChange(event) {
        this.setState({linkName: event.target.value});
    }

    handleLinkUrlChange(event) {
        this.setState({linkUrl: event.target.value});
    }

    handleLinkSubmit(event) {
        const link = {
            ProjectId: this.state.id,
            Name: this.state.linkName,
            Url: this.state.linkUrl
        }
        axios({
            method: 'POST',
            url: 'https://localhost:7040/links/create-link',
            data: link
        }).then(res=>{
            this.getProject();
        });
        this.setState({linkName: "", linkUrl: ""})
        event.preventDefault();
    }

    componentDidMount(){
        this.getProject();
    }

    OnDeleteTaskClick = (taskId) => {
        axios({
            method: 'DELETE',
            url: 'https://localhost:7040/tasks/delete-task',
            params: { projectId: this.state.id, taskId: taskId }
        }).then(res=>{
            this.getProject();
        });
    }

    OnDeleteLinkClick = (linkId) => {
        axios({
            method: 'DELETE',
            url: 'https://localhost:7040/links/delete-link',
            params: { projectId: this.state.id, linkId: linkId }
        }).then(res => {
            this.getProject();
        });
    }

    getProject(){
        axios({
            method: 'GET',
            url: 'https://localhost:7040/projects/get-project-by-id',
            params: { projectId: this.state.id }
        }).then(
            res => {
                const project = res.data;
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
                handleLinkSubmit={this.handleLinkSubmit}

                handleTaskTextChange={this.handleTaskTextChange}
                handleTaskSubmit={this.handleTaskSubmit}

                OnDeleteTaskClick={this.OnDeleteTaskClick}
                OnDeleteLinkClick={this.OnDeleteLinkClick}
                taskText={this.state.taskText}
                linkName={this.state.linkName}
                linkUrl={this.state.linkUrl}
                />
        )
    }
}