import React, {Component} from 'react';
import SignUpPageComponent from './component';
import axios from 'axios';

export class SignUpPageContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: "",
            email: "",
            password: "",
            errorUsernameMessage: "",
            errorEmailMessage: "",
            errorPasswordMessage: ""
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.errorCatcher = this.errorCatcher.bind(this);
    }

    handleUsernameChange(event){
        this.setState({userName: event.target.value});
    }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleUserSubmit(event){
        this.setState({
            errorUsernameMessage: "",
            errorEmailMessage: "",
            errorPasswordMessage: ""
        });

        const user = {
            Username: this.state.userName,
            Email: this.state.email,
            Password: this.state.password
        }

        axios({
            method: 'POST',
            url: 'https://localhost:7040/users/create-user',
            data: user
        }).then(res => {
            window.location.href = 'https://localhost:44413/';
        }).catch(this.errorCatcher);

        event.preventDefault();
    }

    errorCatcher = (error) => {
        const errorType = error.response.data.errorType;
        const errorMessage = error.response.data.errorMessage;

        if(errorType === "Username"){
            this.setState({errorUsernameMessage: errorMessage});
        } else if(errorType === "Email"){
            this.setState({errorEmailMessage: errorMessage});
        } else if(errorType === "Password"){
            this.setState({errorPasswordMessage: errorMessage});
        }
    }

    render(){
        return(
            <SignUpPageComponent 
                handleUsernameChange={this.handleUsernameChange}
                handleEmailChange={this.handleEmailChange}
                handlePasswordChange={this.handlePasswordChange}
                handleUserSubmit={this.handleUserSubmit}

                userName={this.state.userName}
                email={this.state.email}
                password={this.state.password}

                errorUsernameMessage={this.state.errorUsernameMessage}
                errorEmailMessage={this.state.errorEmailMessage}
                errorPasswordMessage={this.state.errorPasswordMessage}
                />
        )
    }
}