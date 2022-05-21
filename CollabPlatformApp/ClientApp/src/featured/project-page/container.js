import React, {Component} from 'react';
import ProjectPageComponent from './component';
import axios from 'axios';
import constants from '../../Constants';
import SpinnerComponent from '../static-components/spinner/component';
import Service from '../../Service';
import { NavbarContainer } from '../static-components/navbar/container';
import AccessDeniedComponent from '../static-components/access-denied/component';

export class ProjectPageContainer extends Component{
    constructor(props){
        super(props);
        
        this.state={
            id: this.props.match.params.id,
            hasAccess: true,
            project: undefined,
            linkName: "",
            linkUrl: "",
            taskText: "",
            contributorName: "",
            errorTaskTextMessage: "",
            errorLinkNameMessage: "",
            errorLinkUrlMessage: "",
            errorConributorMessage: ""
        }

        this.OnDeleteTaskClick = this.OnDeleteTaskClick.bind(this);
        this.OnDeleteLinkClick = this.OnDeleteLinkClick.bind(this);
        this.OnDeleteContributorClick = this.OnDeleteContributorClick.bind(this);

        this.handleLinkNameChange = this.handleLinkNameChange.bind(this);
        this.handleLinkUrlChange = this.handleLinkUrlChange.bind(this);
        this.handleLinkSubmit = this.handleLinkSubmit.bind(this);

        this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);

        this.handleContributorNameChange = this.handleContributorNameChange.bind(this);
        this.handleContributorSubmit = this.handleContributorSubmit.bind(this);

        this.OnDeleteProjectClick = this.OnDeleteProjectClick.bind(this);

        this.errorCatcher = this.errorCatcher.bind(this);
        this.clearErrorMessages = this.clearErrorMessages.bind(this);

        this.OnClearTaskForm = this.OnClearTaskForm.bind(this);
        this.OnClearLinkForm = this.OnClearLinkForm.bind(this);
        this.OnClearContributorForm = this.OnClearContributorForm.bind(this);
        this.OnViewContributorClick = this.OnViewContributorClick.bind(this);
    }

    componentDidMount(){
        this.getProject();
        Service.CheckCookies();
    }

    errorCatcher = (error) => {
        const errorType = error.response.data.errorType;
        const errorMessage = error.response.data.errorMessage;

        if(errorType === "Text"){
            this.setState({errorTaskTextMessage: errorMessage});
        }else if(errorType === "Name"){
            this.setState({errorLinkNameMessage: errorMessage});
        }else if(errorType === "Url"){
            this.setState({errorLinkUrlMessage: errorMessage});
        }else if(errorType === "ContributorName"){
            this.setState({errorConributorMessage: errorMessage});
        }else if(errorType === "ContributorIsExisted"){
            this.setState({errorConributorMessage: errorMessage});
        }
    }

    clearErrorMessages = () => {
        this.setState({errorTaskTextMessage: ""});
        this.setState({errorLinkNameMessage: ""});
        this.setState({errorLinkUrlMessage: ""});
        this.setState({errorConributorMessage: ""});
    }

    handleContributorNameChange(event){
        this.setState({contributorName: event.target.value});
    }

    handleContributorSubmit(event){
        const contributor = {
            projectId: this.state.id,
            name: this.state.contributorName
        };

        this.clearErrorMessages();

        axios({
            method: 'POST',
            url: constants.apiPort + '/project-contributors/add-contributor',
            data: contributor,
            withCredentials: true
        }).then(res=>{
            this.getProject();

            this.setState({contributorName: ""});
        }).catch(this.errorCatcher);

        event.preventDefault();
    }

    handleTaskSubmit(event) {
        const task = {
            projectId: this.state.id,
            text: this.state.taskText
        };

        this.clearErrorMessages();
        
        axios({
            method: 'POST',
            url: constants.apiPort + '/tasks/create-task',
            data: task,
            withCredentials: true
        }).then(res=>{
            this.getProject();
            
            this.setState({taskText: ""});
        }).catch(this.errorCatcher);
        
        event.preventDefault();
    }

    handleLinkSubmit(event) {
        const link = {
            ProjectId: this.state.id,
            Name: this.state.linkName,
            Url: this.state.linkUrl
        }

        this.clearErrorMessages();

        axios({
            method: 'POST',
            url: constants.apiPort + '/links/create-link',
            data: link,
            withCredentials: true
        }).then(res=>{
            this.getProject();
            this.setState({linkName: "", linkUrl: ""});
        }).catch(this.errorCatcher);

        event.preventDefault();
    }

    handleTaskTextChange(event) {
        this.setState({taskText: event.target.value});
    }

    handleLinkNameChange(event) {
        this.setState({linkName: event.target.value});
    }

    handleLinkUrlChange(event) {
        this.setState({linkUrl: event.target.value});
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

    OnDeleteContributorClick = (contributorName) => {
        const contributor = {
            projectId: this.state.id,
            name: contributorName
        };

        axios({
            method: 'DELETE',
            url: constants.apiPort + '/project-contributors/delete-contributor',
            withCredentials: true,
            data: contributor
        }).then(res => {
            this.getProject();
        });
    }

    OnClearTaskForm = () => {
        this.setState({errorTaskTextMessage: ""});
        this.setState({taskText: ""});
    }

    OnClearLinkForm = () => {
        this.setState({errorLinkNameMessage: ""});
        this.setState({errorLinkUrlMessage: ""});
        this.setState({linkName: ""});
        this.setState({linkUrl: ""});
    }

    OnClearContributorForm = () => {
        this.setState({errorConributorMessage: ""});
        this.setState({contributorName: ""});
    }

    OnViewContributorClick = (contributorName) => {
        window.location.href = constants.reactAppPort + `/accounts/${contributorName}/overview`;
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
        ).catch(error => {
            this.setState({hasAccess: false});
        });
    }

    OnDeleteProjectClick = (projectId) => {
        axios({
            method: 'DELETE',
            url: constants.apiPort + '/projects/delete-project',
            params: { projectId: projectId },
            withCredentials: true
        }).then(res => {
            Service.CheckCookies();
            window.location.href = '/accounts/' + Service.getCookie('user_name') + '/projects';
        });
    }

    render(){
        if(this.state.hasAccess === true){
            if(this.state.project !== undefined){
                return (
                    <ProjectPageComponent
                        project={this.state.project}
                        
                        handleLinkNameChange={this.handleLinkNameChange}
                        handleLinkUrlChange={this.handleLinkUrlChange}
                        handleLinkSubmit={this.handleLinkSubmit}
        
                        handleTaskTextChange={this.handleTaskTextChange}
                        handleTaskSubmit={this.handleTaskSubmit}
        
                        handleContributorNameChange={this.handleContributorNameChange}
                        handleContributorSubmit={this.handleContributorSubmit}
        
                        OnDeleteTaskClick={this.OnDeleteTaskClick}
                        OnDeleteLinkClick={this.OnDeleteLinkClick}
                        OnDeleteContributorClick={this.OnDeleteContributorClick}
                        OnDeleteProjectClick={this.OnDeleteProjectClick}
        
                        taskText={this.state.taskText}
                        linkName={this.state.linkName}
                        linkUrl={this.state.linkUrl}
                        contributorName={this.state.contributorName}
        
                        errorTaskTextMessage={this.state.errorTaskTextMessage}
                        errorLinkNameMessage={this.state.errorLinkNameMessage}
                        errorLinkUrlMessage={this.state.errorLinkUrlMessage}
                        errorConributorMessage={this.state.errorConributorMessage}
        
                        OnClearTaskForm={this.OnClearTaskForm}
                        OnClearLinkForm={this.OnClearLinkForm}
                        OnClearContributorForm={this.OnClearContributorForm}
                        OnViewContributorClick={this.OnViewContributorClick}
                        />
                );
            } else {
                return(
                    <SpinnerComponent />
                );
            }
        } else {
            return(
                <div>
                    <NavbarContainer />
                    <AccessDeniedComponent />
                </div>
            );
        }
    }
}