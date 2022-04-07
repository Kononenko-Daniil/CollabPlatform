import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Container} from 'reactstrap';
import { Link } from "react-router-dom";

const HomePageComponent = (props) =>{
    const {projects, 
        OnDeleteProjectClick} = props;

    const [show, setShow] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectId, setProjectId] = useState("");
    const handleAcceptDelete = () => {
        OnDeleteProjectClick(projectId);
        setShow(false);
    }
    const handleCloseDeleteWindow = () => {
        setShow(false);
    }
    const handleShow = (projName, projId) => {
        setShow(true);
        setProjectName(projName);
        setProjectId(projId)
    }

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
                                    <Link to={`/projects/${project.id}`}>
                                        <Button style={{marginRight: "5px"}} variant='success'>Open project</Button>
                                    </Link>
                                    
                                    <Button onClick={() => handleShow(project.name, project.id)} variant='outline-danger'>Delete</Button>
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

            <Modal show={show} onHide={handleCloseDeleteWindow}>
                <Modal.Header closeButton>
                <Modal.Title>Deleting project</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {projectName}?</Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseDeleteWindow}>
                    Cancel
                </Button>
                <Button variant="outline-danger" onClick={handleAcceptDelete}>
                    Delete project
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default HomePageComponent;