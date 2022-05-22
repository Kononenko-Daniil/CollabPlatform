import React from 'react';

import { Container } from 'reactstrap';
import {NavbarContainer} from '../static-components/navbar/container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUpPageComponent = (props) => {
    const {handleUsernameChange, 
        handleEmailChange, 
        handlePasswordChange, 
        handleUserSubmit, 
        userName, 
        email, 
        password, 
        errorUsernameMessage, 
        errorEmailMessage, 
        errorPasswordMessage} = props;

    return(
        <div>
            <NavbarContainer />
            <Container>
                <div class="row">
                    <div class="col" />
                    <div class="col">
                        <h1 className='pageName'
                        style={{display:"block",textAlign:"center"}}>
                            Sign up
                        </h1>
                
                        <Form onSubmit={handleUserSubmit}>
                            <p className="errorFormText">{errorUsernameMessage}</p>
                            <Form.Control
                                placeholder='Username'
                                onChange={handleUsernameChange}
                                value={userName}
                                className="inFormElements"
                                type="input"
                                id="inputUsername"
                            />
                            <p className="errorFormText">{errorEmailMessage}</p>
                            <Form.Control
                                placeholder='Email'
                                onChange={handleEmailChange}
                                value={email}
                                className="inFormElements"
                                type="input"
                                id="inputEmail"
                            />
                            <p className="errorFormText">{errorPasswordMessage}</p>
                            <Form.Control
                                placeholder='Password'
                                onChange={handlePasswordChange}
                                value={password}
                                className="inFormElements"
                                type="password"
                                id="inputPassword"
                            />
                            <Button 
                                variant="outline-success" 
                                type="submit"
                                style={{
                                    display:"block", 
                                    marginRight:"auto",
                                    marginLeft:"auto", 
                                    marginTop: "10px"}}>
                                    Sign up
                            </Button> 
                        </Form>
                    </div>
                    <div class="col" />
                </div>
                
            </Container>
        </div>
    )
}

export default SignUpPageComponent;