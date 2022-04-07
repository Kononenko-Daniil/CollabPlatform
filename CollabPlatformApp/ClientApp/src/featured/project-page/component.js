import React, { useState } from 'react';

import ProjectTasksComponent from './project-tasks/component';
import ProjectLinksComponent from './project-links/component';

import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';


const ProjectPageComponent = (props) => {
    const { project, 
        handleLinkNameChange, 
        handleLinkUrlChange, 
        handleLinkSubmit, 
        handleTaskTextChange,
        handleTaskSubmit, 
        OnDeleteTaskClick, 
        OnDeleteLinkClick,
        taskText, 
        linkName, 
        linkUrl } = props;

    const [key, setKey] = useState('tasks');
    const [showLinkInfoModal, setShowLinkInfoModal] = useState(false);
    const [linkNameModal, setLinkNameModal] = useState("");
    const [linkUrlModal, setLinkUrlModal] = useState("");
    const handleShowLinkInfoModal = (_linkNameModal, _linkUrlModal) => {
        setLinkNameModal(_linkNameModal);
        setLinkUrlModal(_linkUrlModal);
        setShowLinkInfoModal(true);
    }
    const handleCloseLinkInfoModal = () => {
        setShowLinkInfoModal(false);
    }

    return(
        <Container>
            <h1 className='pageName'>{project.name}</h1>
            <Tabs 
                defaultActiveKey="profile" 
                id="project-tab"
                className="mb-3" 
                activeKey={key} 
                onSelect={(k)=>setKey(k)}>
                <Tab eventKey="tasks" title="Tasks">
                    <ProjectTasksComponent 
                        project={project}
                        handleTaskTextChange={handleTaskTextChange}
                        handleTaskSubmit={handleTaskSubmit}
                        OnDeleteTaskClick={OnDeleteTaskClick}
                        taskText={taskText}
                        />
                </Tab>
                <Tab eventKey="links" title="Links">
                    <ProjectLinksComponent 
                        project={project}
                        handleLinkNameChange={handleLinkNameChange}
                        handleLinkUrlChange={handleLinkUrlChange} 
                        handleLinkSubmit={handleLinkSubmit}
                        OnDeleteLinkClick={OnDeleteLinkClick}
                        linkName={linkName}
                        linkUrl={linkUrl}
                        handleShowLinkInfoModal={handleShowLinkInfoModal}
                        />
                </Tab>
            </Tabs>
            
            <Modal show={showLinkInfoModal} onHide={handleCloseLinkInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Link detail info</Modal.Title>
                </Modal.Header>
                <Modal.Body>Name: {linkNameModal} &ensp; URL: {linkUrlModal}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseLinkInfoModal}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ProjectPageComponent;