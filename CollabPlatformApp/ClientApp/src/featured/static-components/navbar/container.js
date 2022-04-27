import axios from 'axios';
import React, { Component } from 'react';
import constants from '../../../Constants';
import NavbarComponent from './component';

export class NavbarContainer extends Component{
    constructor(props){
        super(props);

        this.OnLogOutClick = this.OnLogOutClick.bind(this);
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

    render(){
        return(
            <NavbarComponent 
                OnLogOutClick = {this.OnLogOutClick}
                />
        )
    }
}