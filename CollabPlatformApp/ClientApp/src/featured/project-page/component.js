import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ProjectPageComponent = (props) => {
    const { project, 
        handleLinkNameChange, 
        handleLinkUrlChange, 
        handleLinkSubmit, 
        handleTaskTextChange,
        handleTaskSubmit, 
        OnDeleteTaskClick, 
        taskText, 
        linkName, 
        linkUrl } = props;
    return(
        <Container>
            <h1 className='pageName'>{project.name}</h1>
            {
                project.tasks != undefined ?
                    <div className={"row"}>
                        <div className="col">
                            <h4 className={"tasksLinksNameText"}>Tasks</h4>
                            <form onSubmit={handleTaskSubmit}>
                                <div className={"row addForm"} style={{margin: 'auto'}}>
                                    <div className="col-lg-10">
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
                                        <Button variant='success' type="submit" className="inFormElements">Add</Button>
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
                        <div className={"col col-lg-5"}>
                            <h4 className={"tasksLinksNameText"}>Links</h4>
                            <form onSubmit={handleLinkSubmit}>
                                <div className={"row addForm"}>
                                    <div className="col-lg-4">
                                        <Form.Control
                                            placeholder='Link name'
                                            className="inFormElements"
                                            type="input"
                                            value={linkName}
                                            id="inputLinlkName"
                                            onChange={handleLinkNameChange}
                                        />
                                    </div>
                                    <div className="col-lg-6">
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
                                                <a href={link.url} key={index}>
                                                    <Button variant='outline-secondary' className={"linkElement"}>{link.name}</Button>
                                                </a>
                                            )
                                        }
                                    </div>
                                :
                                <div>
                                    <h5 className='doNotHave'>You don`t have any links...</h5>
                                </div>
                            }
                             
                        </div>
                    </div>
                :
                <div>
                    <h5 className='doNotHave'>Loading...</h5>
                </div>
            }
        </Container>
    )
}

export default ProjectPageComponent;