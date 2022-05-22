import React, {Component} from 'react';

import { NavbarContainer } from '../static-components/navbar/container';
import ProjectPageComponent from './component';
import SpinnerComponent from '../static-components/spinner/component';
import AccessDeniedComponent from '../static-components/access-denied/component';

import axios from 'axios';
import constants from '../../Constants';
import Service from '../../Service';

export class ProjectPageContainer extends Component{
    constructor(props){
        super(props);
        
        this.state={
            id: this.props.match.params.id,
            hasAccess: true,
            project: undefined,
            
        }

        this.OnDeleteProjectClick = this.OnDeleteProjectClick.bind(this);
    }

    componentDidMount(){
        this.getProject();
        Service.CheckCookies();
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

    getProject(){
        axios({
            method: 'GET',
            url: constants.apiPort + '/projects/get-public-project-by-id',
            params: { projectId: this.state.id },
            withCredentials: true
        }).then(
            res => {
                const project = res.data;
                this.setState({ project: project });
            }
        ).catch(error => {
            this.setState({ hasAccess: false });
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