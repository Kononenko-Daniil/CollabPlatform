import React, {Component} from 'react';
import ProjectPageComponent from './component';
import axios from 'axios';
import constants from '../../Constants';

export class ProjectPageContainer extends Component{
    constructor(props){
        super(props);
        
        this.state={
            id: this.props.match.params.id,
            project: {},
            linkName: "",
            linkUrl: "",
            taskText: "",
            errorTaskTextMessage: ""
        }

        this.OnDeleteTaskClick = this.OnDeleteTaskClick.bind(this);
        this.OnDeleteLinkClick = this.OnDeleteLinkClick.bind(this);

        this.handleLinkNameChange = this.handleLinkNameChange.bind(this);
        this.handleLinkUrlChange = this.handleLinkUrlChange.bind(this);
        this.handleLinkSubmit = this.handleLinkSubmit.bind(this);

        this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);

        this.errorCatcher = this.errorCatcher.bind(this);
        this.cleanErrorMeassages = this.cleanErrorMeassages.bind(this);
    }

    cleanErrorMeassages = () => {
        this.setState({
            errorTaskTextMessage: ""
        });
    }

    errorCatcher = (error) => {
        const errorType = error.response.data.errorType;
        const errorMessage = error.response.data.errorMessage;

        if(errorType === "Text"){
            this.setState({errorTaskTextMessage: errorMessage});
        }
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
            url: constants.apiPort + '/tasks/create-task',
            data: task,
            withCredentials: true
        }).then(res=>{
            this.getProject();
            this.cleanErrorMeassages();
        }).catch(this.errorCatcher);
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
            url: constants.apiPort + '/links/create-link',
            data: link,
            withCredentials: true
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
            url: constants.apiPort + '/tasks/delete-task',
            withCredentials: true,
            params: { projectId: this.state.id, taskId: taskId }
        }).then(res=>{
            this.getProject();
        });
    }

    OnDeleteLinkClick = (linkId) => {
        axios({
            method: 'DELETE',
            url: constants.apiPort + '/links/delete-link',
            withCredentials: true,
            params: { projectId: this.state.id, linkId: linkId }
        }).then(res => {
            this.getProject();
        });
    }

    getProject(){
        axios({
            method: 'GET',
            url: constants.apiPort + '/projects/get-project-by-id',
            params: { projectId: this.state.id },
            withCredentials: true
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

                errorTaskTextMessage={this.state.errorTaskTextMessage}
                />
        )
    }
}