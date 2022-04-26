import axios from 'axios';
import React, { Component } from 'react';
import NavbarComponent from './component';

export class NavbarContainer extends Component{
    constructor(props){
        super(props);

        this.OnLogOutClick = this.OnLogOutClick.bind(this);
    }

    OnLogOutClick = () => {
        axios({
            method: 'POST',
            url: 'https://localhost:7040/users/log-out',
            withCredentials: true
        }).then(res => {
            window.location.href = 'https://localhost:44413/';
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