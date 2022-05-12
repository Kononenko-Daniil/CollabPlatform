import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import { Container } from 'reactstrap';
import avatar_2 from './img/avatar_2.jpg';

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
                    </Nav>
                    <Nav>
                        <img src={avatar_2} className={'navbarAvatar'}/>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            align="end"
                            menuVariant="light"
                            >
                                <NavDropdown.Item href="#action/3.1">My account</NavDropdown.Item>
                                <NavDropdown.Item href="/">My projects</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => OnLogOutClick()}>Sign out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;