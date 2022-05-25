import axios from 'axios';
import React, { Component } from 'react';
import constants from '../../Constants';
import ViewAccountPageComponent from './component';
import SpinnerComponent from '../static-components/spinner/component';
import Service from '../../Service';
import { NavbarContainer } from '../static-components/navbar/container';

export class ViewAccountPageContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: this.props.match.params.name,
            user: undefined,
            userBio: "",
            userPublicEmail: "",
            userCompany: "",
            userLocation: "",
            userWebsite: "",
            hasAccess: false,
            tab: this.props.match.params.tab
        }
        console.log(this.state.user);

        this.handleAccountBioChange = this.handleAccountBioChange.bind(this);
        this.handleAccountPublicEmailChange = this.handleAccountPublicEmailChange.bind(this);
        this.handleAccountCompanyChange = this.handleAccountCompanyChange.bind(this);
        this.handleAccountLocationChange = this.handleAccountLocationChange.bind(this);
        this.handleAccountWebsiteChange = this.handleAccountWebsiteChange.bind(this);
        this.handleAccountDescriptionSubmit = this.handleAccountDescriptionSubmit.bind(this);
        this.OnClearUserDescriptionForm = this.OnClearUserDescriptionForm.bind(this);
        this.initDescriptionEditModal = this.initDescriptionEditModal.bind(this);
    }

    componentDidMount(){
        this.getUser();
        Service.CheckCookies();

        const currentUserName = Service.getCookie("user_name");
        if(currentUserName === this.state.userName){
            this.setState({ hasAccess: true });
        }
    }

    handleAccountBioChange = (event) => this.setState({ userBio: event.target.value });
    handleAccountPublicEmailChange = (event) => this.setState({ userPublicEmail: event.target.value });
    handleAccountCompanyChange = (event) => this.setState({ userCompany: event.target.value });
    handleAccountLocationChange = (event) => this.setState({ userLocation: event.target.value });
    handleAccountWebsiteChange = (event) => this.setState({ userWebsite: event.target.value });
    handleAccountDescriptionSubmit(event){
        const userDescription = {
            bio: this.state.userBio,
            publicEmail: this.state.userPublicEmail,
            company:  this.state.userCompany,
            location: this.state.userLocation,
            website: this.state.userWebsite
        }

        axios({
            method: 'POST',
            url: constants.apiPort + '/users/change-user-description',
            data: userDescription,
            withCredentials: true
        }).then(res => {
            this.getUser();
        })

        event.preventDefault();
    }

    initDescriptionEditModal(){
        this.setState({ 
            userBio: this.state.user.bio, 
            userPublicEmail: this.state.user.publicEmail,
            userCompany: this.state.user.company,
            userLocation: this.state.user.location,
            userWebsite: this.state.user.website
        });
    }

    OnClearUserDescriptionForm = () => {
        this.setState({ 
            userBio: "", 
            userPublicEmail: "",
            userCompany: "",
            userLocation: "",
            userWebsite: ""
        });
    }

    getUser(){
        axios({
            method: 'GET',
            url: constants.apiPort + '/accounts/get-account',
            params: { userName: this.state.userName },
            withCredentials: true
        }).then(res => {
            this.setState({user: res.data});
        })
    }

    render(){
        if(this.state.user !== undefined){
            return (
                <ViewAccountPageComponent 
                    user={this.state.user}
                    tab={this.state.tab}
                    handleAccountBioChange={this.handleAccountBioChange}
                    handleAccountPublicEmailChange={this.handleAccountPublicEmailChange}
                    handleAccountCompanyChange={this.handleAccountCompanyChange}
                    handleAccountLocationChange={this.handleAccountLocationChange}
                    handleAccountWebsiteChange={this.handleAccountWebsiteChange}
                    handleAccountDescriptionSubmit={this.handleAccountDescriptionSubmit}
                    userBio={this.state.userBio}
                    userPublicEmail={this.state.userPublicEmail}
                    userCompany={this.state.userCompany}
                    userLocation={this.state.userLocation}
                    userWebsite={this.state.userWebsite}
                    OnClearUserDescriptionForm={this.OnClearUserDescriptionForm}
                    initDescriptionEditModal={this.initDescriptionEditModal}
                    hasAccess={this.state.hasAccess}
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
        
    }
}