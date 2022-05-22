import React from "react";

import { Container } from "reactstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {NavbarContainer} from '../static-components/navbar/container';

const SignInPageComponent = (props) => {
    const {handleEmailChange, 
        handlePasswordChange, 
        handleUserSubmit, 
        email, 
        password, 
        errorMessage} = props;

    return(
        <div>
            <NavbarContainer />
            <Container>
                <div class="row">
                    <div class="col" />
                    <div class="col">
                        <h1 className="pageName"
                        style={{display:"block",textAlign:"center"}}>
                            Sign in
                        </h1>

                        <Form onSubmit={handleUserSubmit} >
                            <p className="errorFormText">{errorMessage}</p>
                            <Form.Control
                                placeholder='Email'
                                onChange={handleEmailChange}
                                value={email}
                                className="inFormElements"
                                type="input"
                                id="inputEmail"
                            />
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
                                    Sign in
                            </Button> 
                        </Form>
                    </div>
                    <div class="col" />
                </div>
                
            </Container>
        </div>
        
    )
}

export default SignInPageComponent;