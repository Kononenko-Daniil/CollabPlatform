import React, {Component} from 'react';
import SignInPageComponent from './component';
import axios from 'axios';
import constants from '../../Constants';

export class SignInPageContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMessage: "",
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.errorCatcher = this.errorCatcher.bind(this);
    }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleUserSubmit(event){
        this.setState({
            errorMessage: "",
        });

        const user = {
            Email: this.state.email,
            Password: this.state.password
        }
        
        axios({
            method: 'POST',
            url: constants.apiPort + '/users/sign-in',
            data: user,
            withCredentials: true
        }).then(res => {
            console.log(document.cookie);    
            window.location.href = constants.apiPort + '/';
        }).catch(this.errorCatcher);

        event.preventDefault();
    }

    errorCatcher = (error) => {
        const errorType = error.response.data.errorType;
        const errorMessage = error.response.data.errorMessage;

        if(errorType === "SignIn"){
            this.setState({errorMessage: errorMessage});
        }
    }

    render(){
        return(
            <SignInPageComponent 
                handleEmailChange={this.handleEmailChange}
                handlePasswordChange={this.handlePasswordChange}
                handleUserSubmit={this.handleUserSubmit}

                email={this.state.email}
                password={this.state.password}

                errorMessage={this.state.errorMessage}
                />
        )
    }
}