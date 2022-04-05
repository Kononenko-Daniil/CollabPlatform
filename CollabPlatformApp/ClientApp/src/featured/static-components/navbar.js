import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'reactstrap';

export class NavbarComponent extends Component{
    render(){
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">CollabPlatform</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/create-project">Create project</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }
}