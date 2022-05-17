import axios from 'axios';
import React, { Component } from 'react';
import constants from '../../Constants';
import ViewAccountPageComponent from './component';
import SpinnerComponent from '../static-components/spinner/component';

export class ViewAccountPageContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: this.props.match.params.name,
            user: undefined
        }
    }

    componentDidMount(){
        this.getUser();
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
                />
            );
        } else {
            return(
                <SpinnerComponent />
            );
        }
        
    }
}