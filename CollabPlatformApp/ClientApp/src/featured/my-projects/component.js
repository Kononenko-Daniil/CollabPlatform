import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalComponent from './modals/deleteProjectModal';
import {NavbarContainer} from '../static-components/navbar/container';
import {Container} from 'reactstrap';
import { Link } from "react-router-dom";

const MyProjectsComponentFirstVariant = (props) =>{
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
                    <div>
                        { 
                            projects.map((project, index) => 
                                <div className={'projectElement row'}> 
                                    <div className='col-lg-11' style={{paddingLeft:"-10px"}}>
                                        <Link 
                                            to={`/projects/${project.id}`} 
                                            style={{color: "black", textDecoration: "none"}}>
                                                <h5 className="projectNameSmall">
                                                    {project.name}
                                                </h5>
                                        </Link>
                                        <p>
                                            Tasks: {project.tasks.length} &ensp; 
                                            Links: {project.links.length} &ensp; 
                                            Contributors: {project.contributors.length}
                                        </p>
                                    </div>
                                    <div className='col'>
                                        <Button 
                                            onClick={() => handleShowDeleteModal(project.name, project.id)} 
                                            variant='outline-danger'
                                            style={{marginTop:"25px"}}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
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

const MyProjectsComponentSecondVariant = (props) =>{
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
                                <Card className={'projectElementCard'} key={index}>
                                    <Card.Body>
                                        <Card.Title>
                                            {project.name}
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted tasksLinksNumText">
                                            Tasks: {project.tasks.length} &ensp; Links: {project.links.length} 
                                            &ensp; Contributors: {project.contributors.length}
                                        </Card.Subtitle>
                                        <Link to={`/projects/${project.id}`}>
                                            <Button 
                                                style={{marginRight: "5px"}} 
                                                variant='outline-success'>
                                                    Open project
                                            </Button>
                                        </Link>
                                        
                                        <Button 
                                            onClick={() => handleShowDeleteModal(project.name, project.id)} 
                                            variant='outline-danger'>
                                                Delete
                                        </Button>
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

export {MyProjectsComponentFirstVariant, MyProjectsComponentSecondVariant};