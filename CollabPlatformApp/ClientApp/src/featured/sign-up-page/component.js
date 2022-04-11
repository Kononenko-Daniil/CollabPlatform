import React from 'react';

import { Container } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUpPageComponent = (props) => {
    return(
        <Container>
            <h1 className='pageName'>Sign up</h1>

            <Form>
                <Form.Control
                    style={{width: "30% "}} 
                    placeholder='Username'
                    className="inFormElements"
                    type="input"
                    id="inputUsername"
                />
                <Form.Control
                    style={{width: "30% "}} 
                    placeholder='Email'
                    className="inFormElements"
                    type="input"
                    id="inputEmail"
                />
                <Form.Control
                    style={{width: "30% "}} 
                    placeholder='Password'
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