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
            contributorName: "",
            errorConributorMessage: ""
        }

        this.OnDeleteContributorClick = this.OnDeleteContributorClick.bind(this);

        this.handleContributorNameChange = this.handleContributorNameChange.bind(this);
        this.handleContributorSubmit = this.handleContributorSubmit.bind(this);

        this.OnDeleteProjectClick = this.OnDeleteProjectClick.bind(this);

        this.errorCatcher = this.errorCatcher.bind(this);
        this.clearErrorMessages = this.clearErrorMessages.bind(this);

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
                                
                        handleContributorNameChange={this.handleContributorNameChange}
                        handleContributorSubmit={this.handleContributorSubmit}
        
                        OnDeleteContributorClick={this.OnDeleteContributorClick}
                        OnDeleteProjectClick={this.OnDeleteProjectClick}
        
                        contributorName={this.state.contributorName}
        
                        errorConributorMessage={this.state.errorConributorMessage}
        
                        OnClearContributorForm={this.OnClearContributorForm}
                        OnViewContributorClick={this.OnViewContributorClick}
                        />
                );
            } else {
                return(
                    <div>
                        <NavbarContainer />
                        <SpinnerComponent />
                    </div>
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