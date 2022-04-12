import React from 'react';

import { Container } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUpPageComponent = (props) => {
    const {handleUsernameChange, 
        handleEmailChange, 
        handlePasswordChange, 
        handleUserSubmit, 
        userName, 
        email, 
        password} = props;

    return(
        <Container>
            <h1 className='pageName'>Sign up</h1>

            <Form onSubmit={handleUserSubmit}>
                <Form.Control
                    style={{width: "30% "}} 
                    placeholder='Username'
                    onChange={handleUsernameChange}
                    value={userName}
                    className="inFormElements"
                    type="input"
                    id="inputUsername"
                />
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
                <Button variant="success" type="submit">Sign up</Button> 
            </Form>
        </Container>
    )
}

export default SignUpPageComponent;