import axios from 'axios';
import React, { Component } from 'react';
import constants from '../../../Constants';
import { NavbarComponentSigned, NavbarComponentUnsigned } from './component';
import Service from '../../../Service';

export class NavbarContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            service: new Service(),
            currentUserName: ""
        }

        this.OnLogOutClick = this.OnLogOutClick.bind(this);
    }

    componentDidMount(){
        this.setState({currentUserName: this.state.service.getCookie("user_name")});
    }

    OnLogOutClick = () => {
        axios({
            method: 'POST',
            url: constants.apiPort + '/users/log-out',
            withCredentials: true
        }).then(res => {
            window.location.href = constants.reactAppPort + '/';
        })
    }

    checkIsUserLogged(){
        const logCookie = this.state.service.getCookie("log_in");
        const isLogged = logCookie == "yes" ? true : false;

        return isLogged;
    }

    render(){
        if(this.checkIsUserLogged()){
            return(
                <NavbarComponentSigned 
                    OnLogOutClick = {this.OnLogOutClick}
                    currentUserName={this.state.currentUserName}
                    />
            );
        } else {
            return(
                <NavbarComponentUnsigned 
                    />
            );
        }
    }
}