import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import { Container } from 'reactstrap';

import avatar_2 from '../../../img/avatar_2.jpg';
import plus_icon from '../../../img/plus_icon.png';
import { Link } from 'react-router-dom';

const NavbarComponentSigned = (props) => {
    const {
        OnLogOutClick, 
        currentUserName
    } = props;

    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">CollabPlatform</Navbar.Brand>
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <img 
                            src={plus_icon} 
                            className={"plusIcon"}
                            />
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            align="end"
                            menuVariant="light"
                            style={{marginRight: "15px"}}
                            >
                                <NavDropdown.Item href="/create-project">New project</NavDropdown.Item>
                        </NavDropdown>
                        <img src={avatar_2} className={'navbarAvatar'}/>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            align="end"
                            menuVariant="light"
                            >
                                <NavDropdown.ItemText>
                                    Signed in as <br/>
                                    <Link 
                                        style={{fontWeight: "500", color: "black", textDecoration:"none"}}
                                        to={"/accounts/" + currentUserName + "/overview"}>
                                        {currentUserName}
                                    </Link>
                                </NavDropdown.ItemText>
                                <NavDropdown.Divider />
                                <NavDropdown.Item 
                                    href={"/accounts/" + currentUserName + "/overview"}>
                                        My account
                                </NavDropdown.Item>
                                <NavDropdown.Item 
                                    href={"/accounts/" + currentUserName + "/projects"}>
                                        My projects
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item 
                                    onClick={() => OnLogOutClick()}>
                                        Sign out
                                </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

const NavbarComponentUnsigned = (props) => {
    const {} = props;

    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">CollabPlatform</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/sign-up">Sign up</Nav.Link>
                        <Nav.Link href="/sign-in">Sign in</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export { NavbarComponentSigned, NavbarComponentUnsigned };