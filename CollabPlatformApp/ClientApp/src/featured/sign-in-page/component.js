import React from "react";

import { Container } from "reactstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignInPageComponent = (props) => {
    const {handleEmailChange, 
        handlePasswordChange, 
        handleUserSubmit, 
        email, 
        password, 
        errorMessage} = props;

    return(
        <Container>
            <h1 className="pageName">Sign in</h1>

            <Form onSubmit={handleUserSubmit}>
                <p className="errorFormText">{errorMessage}</p>
                <Form.Control
                    style={{width: "30% "}} 
                    placeholder='Email'
                    onChange={handleEmailChange}
                    value={email}
                    className="inFormElements"
                    type="input"
                    id="inputEmail"
                />
                <Form.Control
                    style={{width: "30% "}} 
                    placeholder='Password'
                    onChange={handlePasswordChange}
                    value={password}
                    className="inFormElements"
                    type="password"
                    id="inputPassword"
                />
                <Button variant="success" type="submit">Sign in</Button> 
            </Form>
        </Container>
    )
}

export default SignInPageComponent;