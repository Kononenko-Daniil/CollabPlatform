import React, { useState } from 'react';

import ProjectTasksComponent from './components/projectTasksComponent';
import ProjectLinksComponent from './components/projectLinksComponent';

import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
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
        linkUrl, 
        errorTaskTextMessage, 
        errorLinkNameMessage, 
        errorLinkUrlMessage } = props;

    const [key, setKey] = useState('tasks');

    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const handleShowAddTaskModal = () => setShowAddTaskModal(true);
    const handleCloseAddTaskModal = () => setShowAddTaskModal(false);

    const [showAddLinkModal, setShowAddLinkModal] = useState(false);
    const handleShowAddLinkModal = () => setShowAddLinkModal(true);
    const handleCloseAddLinkModal = () => setShowAddLinkModal(false);

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
                        handleShowAddTaskModal={handleShowAddTaskModal}
                        handleCloseAddTaskModal={handleCloseAddTaskModal}
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
                        handleShowAddLinkModal={handleShowAddLinkModal}
                        />
                </Tab>
            </Tabs>
            
            <Modal show={showLinkInfoModal} onHide={handleCloseLinkInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Link info</Modal.Title>
                </Modal.Header>
                <Modal.Body>Name: {linkNameModal} &ensp; URL: {linkUrlModal}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseLinkInfoModal}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddTaskModal} onHide={handleCloseAddTaskModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add task</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleTaskSubmit}>
                    <Modal.Body>
                        <p className="errorFormText">{errorTaskTextMessage}</p>
                        <Form.Control
                            placeholder='Task'
                            value={taskText}
                            className="inFormElements"
                            type="input"
                            id="inputTaskText"
                            onChange={handleTaskTextChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"outline-success"} type={"submit"}>Add task</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showAddLinkModal} onHide={handleCloseAddLinkModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add link</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleLinkSubmit}>
                    <Modal.Body>
                        <p className="errorFormText">{errorLinkNameMessage}</p>
                        <Form.Control
                            placeholder='Link name'
                            className="inFormElements"
                            type="input"
                            value={linkName}
                            id="inputLinlkName"
                            onChange={handleLinkNameChange}
                        />
                        <p className="errorFormText">{errorLinkUrlMessage}</p>
                        <Form.Control
                            placeholder='URL'
                            className="inFormElements"
                            type="input"
                            value={linkUrl}
                            id="inputLinkURL"
                            onChange={handleLinkUrlChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"outline-success"} type={"submit"}>Add link</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
        </Container>
    )
}

export default ProjectPageComponent;