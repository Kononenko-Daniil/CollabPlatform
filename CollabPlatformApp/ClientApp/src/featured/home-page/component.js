import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Container} from 'reactstrap';

const HomePageComponent = (props) =>{
    const {projects, OnDeleteProjectClick} = props; 
    return(
        <Container>
            <h1 className={"pageName"}>My projects</h1>
            {
                projects.length !== 0 ? 
                <div className={"row"}>
                    { 
                        projects.map((project, index) => 
                            <Card className={'projectElement'} key={index}>
                                <Card.Body>
                                    <Card.Title>{project.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted tasksLinksNumText">
                                        Tasks: {project.tasks.length} &ensp; Links: {project.links.length}
                                    </Card.Subtitle>
                                    <Button style={{marginRight: "5px"}} variant='success'>Open project</Button>
                                    <Button onClick={() => OnDeleteProjectClick(project.id)} variant='danger'>Delete</Button>
                                </Card.Body>
                            </Card>
                        )
                    }
                </div> 
                :
                <div>
                    <h5 className='doNotHave'>You don`t have any projects...</h5>
                </div>
                
            }
            
            
        </Container>
    )
}
//#DE0000  ef0000 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
export default HomePageComponent;