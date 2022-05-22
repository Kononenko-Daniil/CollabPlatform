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
            tab: this.props.match.params.tab
        }
    }

    componentDidMount(){
        this.getUser();
        Service.CheckCookies();
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