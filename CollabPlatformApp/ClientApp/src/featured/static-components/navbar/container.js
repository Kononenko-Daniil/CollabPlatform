import axios from 'axios';
import React, { Component } from 'react';
import constants from '../../../Constants';
import { NavbarComponentSigned, NavbarComponentUnsigned } from './component';

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

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    checkIsUserLogged(){
        const logCookie = this.getCookie("log_in");
        const isLogged = logCookie == "yes" ? true : false;

        return isLogged;
    }

    render(){
        if(this.checkIsUserLogged()){
            return(
                <NavbarComponentSigned 
                    OnLogOutClick = {this.OnLogOutClick}
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