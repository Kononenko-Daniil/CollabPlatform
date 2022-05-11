import axios from 'axios';
import React, { Component } from 'react';
import constants from '../../Constants';
import ViewAccountPageComponent from './component';

export class ViewAccountPageContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            user: {}
        }
    }

    componentDidMount(){
        this.getUser();
    }

    getUser(){
        axios({
            method: 'GET',
            url: constants.apiPort + '/users/get-user-by-id',
            params: { userId: this.state.id},
            withCredentials: true
        }).then(res => {
            this.setState({user: res.data});
        })
    }

    render(){
        return (
            <ViewAccountPageComponent 
                user={this.state.user}
            />
        )
    }
}