import React, { useState } from 'react';

import ContributorAddModal from './modals/contributorAddModal';
import {NavbarContainer} from '../static-components/navbar/container';
import DeleteProjectModal from './modals/deleteProjectModal';

import { Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import { ProjectTasksContainer } from './components/project-tasks-component/container';
import { ProjectLinksContainer } from './components/project-links-component/container';
import { ProjectContributorsContainer } from './components/project-contributors-component/container';

const ProjectPageComponent = (props) => {
    const { project, 

        

        OnDeleteContributorClick,
        OnDeleteProjectClick,

        

         } = props;

    const [key, setKey] = useState('tasks');

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
                        <ProjectTasksContainer 
                            projectId={project.id}
                            />
                    </Tab>
                    <Tab eventKey="links" title="Links">
                        <ProjectLinksContainer 
                            projectId={project.id}
                            />
                    </Tab>
                    <Tab eventKey="contributors" title="Contributors">
                        <ProjectContributorsContainer
                            projectId={project.id}
                            />
                    </Tab>
                </Tabs>

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