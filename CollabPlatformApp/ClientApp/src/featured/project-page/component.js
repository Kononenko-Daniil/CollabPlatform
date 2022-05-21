import React, { useState } from 'react';

import ProjectTasksComponent from './components/projectTasksComponent';
import ProjectLinksComponent from './components/projectLinksComponent';
import ProjectContributorsComponent from './components/projectContributorsComponent';

import LinkInfoModal from './modals/linkInfoModal';
import LinkAddModal from './modals/linkAddModal';
import ContributorAddModal from './modals/contributorAddModal';
import {NavbarContainer} from '../static-components/navbar/container';
import TaskAddModal from './modals/taskAddModal';
import DeleteProjectModal from './modals/deleteProjectModal';

import { Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

const ProjectPageComponent = (props) => {
    const { project, 

        handleLinkNameChange, 
        handleLinkUrlChange, 
        handleLinkSubmit, 

        handleTaskTextChange,
        handleTaskSubmit, 

        handleContributorNameChange,
        handleContributorSubmit,

        OnDeleteTaskClick, 
        OnDeleteLinkClick,
        OnDeleteContributorClick,
        OnDeleteProjectClick,

        taskText, 
        linkName, 
        linkUrl, 
        contributorName,

        errorTaskTextMessage, 
        errorLinkNameMessage, 
        errorLinkUrlMessage, 
        errorConributorMessage,

        OnClearTaskForm, 
        OnClearLinkForm, 
        OnClearContributorForm, 
        OnViewContributorClick } = props;

    const [key, setKey] = useState('tasks');

    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const handleShowAddTaskModal = () => setShowAddTaskModal(true);
    const handleCloseAddTaskModal = () => setShowAddTaskModal(false);

    const [showAddLinkModal, setShowAddLinkModal] = useState(false);
    const handleShowAddLinkModal = () => setShowAddLinkModal(true);
    const handleCloseAddLinkModal = () => setShowAddLinkModal(false);

    const [showAddContibutorModal, setShowAddContributorModal] = useState(false);
    const handleShowAddContibutorModal = () => setShowAddContributorModal(true);
    const handleCloseAddContibutorModal = () => setShowAddContributorModal(false);

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
            <NavbarContainer />
            <Container>
                <h1 className='pageName' style={{marginBottom: "0px"}}>{project.name}</h1>
                <p>Author: <strong>{project.author}</strong></p>
                <Button 
                    onClick={()=>handleShowDeleteModal(project.name, project.id)}
                    variant='outline-danger'
                    style={{marginBottom: "10px"}}>Delete project</Button>
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
                            OnDeleteLinkClick={OnDeleteLinkClick}
                            handleShowLinkInfoModal={handleShowLinkInfoModal}
                            handleShowAddLinkModal={handleShowAddLinkModal}
                            />
                    </Tab>
                    <Tab eventKey="contributors" title="Contributors">
                        <ProjectContributorsComponent 
                            project={project}
                            OnDeleteContributorClick={OnDeleteContributorClick}
                            OnViewContributorClick={OnViewContributorClick}
                            handleShowAddContibutorModal={handleShowAddContibutorModal}
                            />
                    </Tab>
                </Tabs>
                
                <TaskAddModal 
                    showAddTaskModal={showAddTaskModal}
                    handleCloseAddTaskModal={handleCloseAddTaskModal}
                    handleTaskSubmit={handleTaskSubmit}
                    errorTaskTextMessage={errorTaskTextMessage}
                    taskText={taskText}
                    handleTaskTextChange={handleTaskTextChange}
                    OnClearTaskForm={OnClearTaskForm}
                    />

                <LinkInfoModal 
                    showLinkInfoModal={showLinkInfoModal}
                    handleCloseLinkInfoModal={handleCloseLinkInfoModal}
                    linkNameModal={linkNameModal}
                    linkUrlModal={linkUrlModal}
                    />

                <LinkAddModal 
                    showAddLinkModal={showAddLinkModal}
                    handleCloseAddLinkModal={handleCloseAddLinkModal}
                    handleLinkSubmit={handleLinkSubmit}
                    errorLinkNameMessage={errorLinkNameMessage}
                    linkName={linkName}
                    handleLinkNameChange={handleLinkNameChange}
                    errorLinkUrlMessage={errorLinkUrlMessage}
                    linkUrl={linkUrl}
                    handleLinkUrlChange={handleLinkUrlChange}
                    OnClearLinkForm={OnClearLinkForm}
                    />

                <ContributorAddModal 
                    showAddContibutorModal={showAddContibutorModal}
                    handleCloseAddContibutorModal={handleCloseAddContibutorModal}
                    handleContributorSubmit={handleContributorSubmit}
                    errorConributorMessage={errorConributorMessage}
                    contributorName={contributorName}
                    handleContributorNameChange={handleContributorNameChange}
                    OnClearContributorForm={OnClearContributorForm}
                    />

                <DeleteProjectModal 
                    showDeleteProjectModal={showDeleteProjectModal}
                    projectName={projectName}
                    handleAcceptDelete={handleAcceptDelete}
                    handleCloseDeleteModal={handleCloseDeleteModal}
                    />
                
            </Container>
        </div>
    )
}

export default ProjectPageComponent;