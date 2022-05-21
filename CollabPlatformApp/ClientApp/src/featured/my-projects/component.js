import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalComponent from './modals/deleteProjectModal';
import {NavbarContainer} from '../static-components/navbar/container';
import {Container} from 'reactstrap';
import { Link } from "react-router-dom";

const MyProjectsComponent = (props) =>{
    const {projects, 
        OnDeleteProjectClick} = props;

    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectId, setProjectId] = useState("");
    const handleAcceptDelete = () => {
        OnDeleteProjectClick(projectId);
        setShowDeleteProjectModal(false);
    }
    const handleCloseDeleteModal = () => {
        setShowDeleteProjectModal(false);
    }
    const handleShowDeleteModal = (projName, projId) => {
        setShowDeleteProjectModal(true);
        setProjectName(projName);
        setProjectId(projId)
    }

    return(
        <div>
            <Container>
                {
                    projects.length !== 0 ? 
                    <div className={"row"}>
                        { 
                            projects.map((project, index) => 
                                <Card className={'projectElement'} key={index}>
                                    <Card.Body>
                                        <Card.Title>
                                            <Link 
                                                to={`/projects/${project.id}`}
                                                className={'projectNameSmall'}>
                                                {project.name}
                                            </Link>
                                        </Card.Title>
                                        <Card.Subtitle 
                                            className="mb-2">
                                                <p className='authorName'>
                                                        Author: <strong>{project.author}</strong>
                                                </p>
                                        </Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted tasksLinksNumText">
                                            Tasks: {project.taskNum} &ensp; Links: {project.linkNum} 
                                            &ensp; Contributors: {project.contributorNum}
                                        </Card.Subtitle>
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

                <ModalComponent 
                    showDeleteProjectModal={showDeleteProjectModal}
                    projectName={projectName}
                    handleAcceptDelete={handleAcceptDelete}
                    handleCloseDeleteModal={handleCloseDeleteModal}
                    />
            </Container>
        </div>
    )
}

export default MyProjectsComponent;