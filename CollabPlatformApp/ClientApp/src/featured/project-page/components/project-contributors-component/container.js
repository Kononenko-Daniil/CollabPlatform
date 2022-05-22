import React, { Component } from 'react';

import ProjectContributorsComponent from './component';
import SpinnerComponent from '../../../static-components/spinner/component';

import axios from 'axios';
import constants from '../../../../Constants';

export class ProjectContributorsContainer extends Component{
    constructor(props){
        super(props);
        const{ projectId } = this.props;
        
        this.state = {
            projectId: projectId,
            contributors: undefined,
            contributorName: "",
            errorConributorMessage: ""
        }

        this.handleContributorNameChange = this.handleContributorNameChange.bind(this);
        this.handleContributorSubmit = this.handleContributorSubmit.bind(this);
        this.OnClearContributorForm = this.OnClearContributorForm.bind(this);
        this.OnViewContributorClick = this.OnViewContributorClick.bind(this);
        this.OnDeleteContributorClick = this.OnDeleteContributorClick.bind(this);
    }

    componentDidMount(){
        this.getContributors();
    }

    handleContributorNameChange(event){
        this.setState({ contributorName: event.target.value });
    }

    handleContributorSubmit(event){
        const contributor = {
            projectId: this.state.projectId,
            name: this.state.contributorName
        };

        this.clearErrorMessages();

        axios({
            method: 'POST',
            url: constants.apiPort + '/contributors/add-contributor',
            data: contributor,
            withCredentials: true
        }).then(res=>{
            this.getContributors();

            this.setState({ contributorName: "" });
        }).catch(this.errorCatcher);

        event.preventDefault();
    }

    OnClearContributorForm = () => {
        this.setState({ errorConributorMessage: "" });
        this.setState({ contributorName: "" });
    }

    OnViewContributorClick = (contributorName) => {
        window.location.href = constants.reactAppPort + `/accounts/${contributorName}/overview`;
    }

    OnDeleteContributorClick = (contributorName) => {
        const contributor = {
            projectId: this.state.projectId,
            name: contributorName
        };

        axios({
            method: 'DELETE',
            url: constants.apiPort + '/contributors/delete-contributor',
            withCredentials: true,
            data: contributor
        }).then(res => {
            this.getContributors();
        });
    }

    clearErrorMessages = () => {
        this.setState({ errorConributorMessage: "" });
    }

    errorCatcher = (error) => {
        const errorType = error.response.data.errorType;
        const errorMessage = error.response.data.errorMessage;

        if(errorType === "ContributorName"){
            this.setState({ errorConributorMessage: errorMessage });
        } else if(errorType === "ContributorIsExisted"){
            this.setState({ errorConributorMessage: errorMessage });
        }
    }

    getContributors(){
        axios({
            method: 'GET',
            url: constants.apiPort + '/contributors/get-project-contributors',
            params: { projectId: this.state.projectId },
            withCredentials: true
        }).then(res => {
                const contributors = res.data;
                this.setState({ contributors: contributors });
            }
        );
    }

    render(){
        if(this.state.contributors !== undefined){
            return(
                <ProjectContributorsComponent 
                    contributors={this.state.contributors}
                    handleContributorNameChange={this.handleContributorNameChange}
                    handleContributorSubmit={this.handleContributorSubmit}
                    OnClearContributorForm={this.OnClearContributorForm}
                    OnViewContributorClick={this.OnViewContributorClick}
                    OnDeleteContributorClick={this.OnDeleteContributorClick}
                    contributorName={this.state.contributorName}
                    errorConributorMessage={this.state.errorConributorMessage}
                    />
            );
        } else {
            return(
                <SpinnerComponent />
            );
        }
    }
}