import React, { Component } from 'react';

import ProjectLinksComponent from './component';
import SpinnerComponent from '../../../static-components/spinner/component';

import axios from 'axios';
import constants from '../../../../Constants';

export class ProjectLinksContainer extends Component{
    constructor(props){
        super(props);
        const{ projectId } = this.props;
        
        this.state = {
            projectId: projectId,
            links: undefined,
            linkName: "",
            linkUrl: "",
            errorLinkNameMessage: "",
            errorLinkUrlMessage: "",
        }

        this.handleLinkNameChange = this.handleLinkNameChange.bind(this);
        this.handleLinkUrlChange = this.handleLinkUrlChange.bind(this);
        this.handleLinkSubmit = this.handleLinkSubmit.bind(this);
        this.OnClearLinkForm = this.OnClearLinkForm.bind(this);
        this.OnDeleteLinkClick = this.OnDeleteLinkClick.bind(this);
    }

    componentDidMount(){
        this.getLinks();
    }

    handleLinkNameChange(event) {
        this.setState({ linkName: event.target.value });
    }

    handleLinkUrlChange(event) {
        this.setState({ linkUrl: event.target.value });
    }

    handleLinkSubmit(event) {
        const link = {
            projectId: this.state.projectId,
            name: this.state.linkName,
            url: this.state.linkUrl
        }

        this.clearErrorMessages();

        axios({
            method: 'POST',
            url: constants.apiPort + '/links/create-link',
            data: link,
            withCredentials: true
        }).then(res=>{
            this.getLinks();

            this.setState({ linkName: "", linkUrl: "" });
        }).catch(this.errorCatcher);

        event.preventDefault();
    }

    OnClearLinkForm = () => {
        this.setState({ errorLinkNameMessage: "" });
        this.setState({ errorLinkUrlMessage: "" });
        this.setState({ linkName: "" });
        this.setState({ linkUrl: "" });
    }

    OnDeleteLinkClick = (linkId) => {
        axios({
            method: 'DELETE',
            url: constants.apiPort + '/links/delete-link',
            withCredentials: true,
            params: { projectId: this.state.projectId, linkId: linkId }
        }).then(res => {
            this.getLinks();
        });
    }

    clearErrorMessages = () => {
        this.setState({ errorLinkNameMessage: "" });
        this.setState({ errorLinkUrlMessage: "" });
    }

    errorCatcher = (error) => {
        const errorType = error.response.data.errorType;
        const errorMessage = error.response.data.errorMessage;

        if(errorType === "Name"){
            this.setState({ errorLinkNameMessage: errorMessage });
        }else if(errorType === "Url"){
            this.setState({ errorLinkUrlMessage: errorMessage });
        }
    }

    getLinks(){
        axios({
            method: 'GET',
            url: constants.apiPort + '/links/get-project-links',
            params: { projectId: this.state.projectId },
            withCredentials: true
        }).then(res => {
                const links = res.data;
                this.setState({ links: links });
            }
        );
    }

    render(){
        if(this.state.links !== undefined){
            return(
                <ProjectLinksComponent 
                    links={this.state.links}
                    handleLinkNameChange={this.handleLinkNameChange}
                    handleLinkUrlChange={this.handleLinkUrlChange}
                    handleLinkSubmit={this.handleLinkSubmit}
                    OnClearLinkForm={this.OnClearLinkForm}
                    OnDeleteLinkClick={this.OnDeleteLinkClick}
                    linkName={this.state.linkName}
                    linkUrl={this.state.linkUrl}
                    errorLinkNameMessage={this.state.errorLinkNameMessage}
                    errorLinkUrlMessage={this.state.errorLinkUrlMessage}
                    />
            );
        } else {
            return(
                <SpinnerComponent />
            );
        }
    }
}