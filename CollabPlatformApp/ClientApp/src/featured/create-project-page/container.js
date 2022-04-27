import React, {Component} from 'react';
import CreatePageComponent from './component';
import axios from 'axios';
import constants from '../../Constants';

export class CreatePageContainer extends Component{
    static displayName = CreatePageContainer.name;
    constructor(props){
        super(props);

        this.state ={
            projectName: "",
            errorProjectNameMessage: ""
        }

        this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
        this.handleProjectSubmit = this.handleProjectSubmit.bind(this);
        
        this.errorCatcher = this.errorCatcher.bind(this);
    }

    handleProjectNameChange(event) {
        this.setState({projectName: event.target.value});
    }

    handleProjectSubmit(event) {
        const project = {
            name: this.state.projectName
        }
        
        axios({
            method: 'POST',
            url: constants.apiPort + '/projects/create-project',
            withCredentials: true,
            data: project
        }).then(res=>{
            const projectId = res.data;
            window.location.href = constants.reactAppPort + '/projects/' + projectId;
        }).catch(this.errorCatcher);
        event.preventDefault();
    }
    
    errorCatcher = (error) => {
        const errorType = error.response.data.errorType;
        const errorMessage = error.response.data.errorMessage;

        if(errorType === "Name"){
            this.setState({errorProjectNameMessage: errorMessage});
        }
    }

    render(){
        return(
            <CreatePageComponent
                projectName={this.state.projecName}

                handleProjectNameChange={this.handleProjectNameChange}
                handleProjectSubmit={this.handleProjectSubmit}

                errorProjectNameMessage={this.state.errorProjectNameMessage}
                />
        )
    }
}