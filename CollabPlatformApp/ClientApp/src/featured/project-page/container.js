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
            
        }



        this.OnDeleteProjectClick = this.OnDeleteProjectClick.bind(this);
        this.errorCatcher = this.errorCatcher.bind(this);
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
                        OnDeleteProjectClick={this.OnDeleteProjectClick}
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