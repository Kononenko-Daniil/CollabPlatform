import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'reactstrap';

const NavbarComponent = (props) => {
    const {OnLogOutClick} = props;

    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">CollabPlatform</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/create-project">Create project</Nav.Link>
                        <Nav.Link href="/sign-up">Sign up</Nav.Link>
                        <Nav.Link href="/sign-in">Sign in</Nav.Link>
                        <Nav.Link onClick={() => OnLogOutClick()}>Log out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;