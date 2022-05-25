import React from 'react';
import { Container } from 'reactstrap';
import {NavbarContainer} from '../static-components/navbar/container';

const HomePageComponent = (props) => {
    return(
        <div>
            <NavbarContainer />
            <Container>
                <h1 className={"pageName"}>CollabPlatform</h1>
                <h4><u>What is it?</u></h4>
                <p>CollabPlatform is a web-platform for collaborating 
                    with other people in order to create interesting projects</p>
                
                <h4><u>What can you do now?</u></h4>
                <p><strong>Create projects:) </strong>
                    Every project may contain tasks, which your team should do. <br/> 
                    Also you may add special links to some resources you need, 
                    for example Github, Google Drive, Google Docs and etc. <br/>
                    <strong>You can work with team! </strong>
                    Now you can add contributors to your project.</p>
                
                <h4><u>Technology</u></h4>
                <ul>
                    <li>.NET 6 (Back-end)</li>
                    <li>React (Front-end)</li>
                    <li>MongoDb (Database)</li>
                </ul>
            </Container>
        </div>
    )
}

export default HomePageComponent;