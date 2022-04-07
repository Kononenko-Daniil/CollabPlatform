import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

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

    return(
        <Container>
            <h1 className='pageName'>{project.name}</h1>
            <Tabs defaultActiveKey="profile" id="project-tab" className="mb-3" activeKey={key} onSelect={(k)=>setKey(k)}>
                <Tab eventKey="tasks" title="Tasks">
                    {
                        project.tasks != undefined ?
                            <div>
                                
                                <form onSubmit={handleTaskSubmit}>
                                    <div className={"row addForm"} style={{margin: 'auto'}}>
                                        <div className="col">
                                            <Form.Control
                                                placeholder='Task'
                                                value={taskText}
                                                className="inFormElements"
                                                type="input"
                                                id="inputTaskText"
                                                onChange={handleTaskTextChange}
                                            />
                                        </div>
                                        <div className="col-lg-1">
                                            <Button 
                                                variant='success' 
                                                type="submit" 
                                                className="inFormElements"
                                                style={{width: "fit-content"}}>Add</Button>
                                        </div>
                                    </div>
                                </form>
                                {
                                    project.tasks.length !== 0 ?
                                    <div>
                                        {
                                            project.tasks.map((task, index) => 
                                                <Card className={'taskElement'} key={index}>
                                                    <Card.Body>
                                                        <div className={"row"}>
                                                            <div className={"col"} style={{width: "300px"}}>
                                                                <h6 className={'tasksLinksNameText'} >
                                                                    {task.text}
                                                                </h6>
                                                            </div>
                                                            <div style={{width: 'auto'}}>
                                                                <Button variant='outline-danger' onClick={()=>OnDeleteTaskClick(task.id)}>Delete</Button>
                                                            </div>
                                                        </div>
                                                        
                                                    </Card.Body>
                                                </Card>
                                            )
                                        }  
                                    </div>
                                    :
                                    <div>
                                        <h5 className='doNotHave'>You don`t have any tasks...</h5>
                                    </div>
                                }
                            </div>
                        :
                            <div>
                                <Spinner animation="border" variant="secondary" className={'loadingSpinner'} />
                            </div>
                    }
                </Tab>
                <Tab eventKey="links" title="Links">
                    {
                        project.links != undefined ?
                            <div>
                                <form onSubmit={handleLinkSubmit}>
                                    <div className={"row addForm"}>
                                        <div className="col">
                                            <Form.Control
                                                placeholder='Link name'
                                                className="inFormElements"
                                                type="input"
                                                value={linkName}
                                                id="inputLinlkName"
                                                onChange={handleLinkNameChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <Form.Control
                                                placeholder='URL'
                                                className="inFormElements"
                                                type="input"
                                                value={linkUrl}
                                                id="inputLinkURL"
                                                onChange={handleLinkUrlChange}
                                            />
                                        </div>
                                        <div className="col-lg-1">
                                            <Button variant='success' type="submit" className="inFormElements">Add</Button>
                                        </div>
                                    </div>
                                </form>
                                {
                                    project.links.length != 0 ?
                                        <div>
                                            {
                                                project.links.map((link, index) => 
                                                    <div className='div-row'>
                                                        <Dropdown key={index} >
                                                            <Dropdown.Toggle variant={"inline-secondary"} className={"linkElement"} id="dropdown-basic">
                                                            {link.name}
                                                            </Dropdown.Toggle>
                                                        
                                                            <Dropdown.Menu>
                                                            <Dropdown.Item href={link.url}>Open</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => OnDeleteLinkClick(link.id)}>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    :
                                        <div>
                                            <h5 className='doNotHave'>You don`t have any links...</h5>
                                        </div>
                                }
                            </div>
                        :
                            <div>
                                <Spinner animation="border" variant="secondary" className={'loadingSpinner'} />
                            </div>
                    }
                </Tab>
            </Tabs>
            
            
        </Container>
    )
}

export default ProjectPageComponent;